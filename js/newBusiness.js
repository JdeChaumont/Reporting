//*******************************************************************************
// Spinner
//*******************************************************************************
var spinOpts = {
  lines: 13, // The number of lines to draw
  length: 20, // The length of each line
  width: 10, // The line thickness
  radius: 30, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};

var targetDef = document.getElementById('spin2');

function spin(){
        ret = {};
        ret.spinner = null;
        ret.spin = function(opts,target){
            if(ret.spinner===null) {
                ret.spinner = new Spinner(opts||spinOpts).spin(target||targetDef);
            }
        }
        ret.stop = function(){
            if(ret.spinner!==null){
                ret.spinner.stop();
            }
            ret.spinner = null;
        }
        return ret;
}
spinner = spin();

//*******************************************************************************
// Configuration requirements
//*******************************************************************************
var utilsValues = {
    "shortmonths"	: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "monthsletters"	: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    "fullmonths"	: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "shortdays"		: ["M", "T", "W", "T", "F", "S", "S"],
    "fulldays" 		: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

}
var numPeriods = periods.mth.length;

//*******************************************************************************
//Step 4 - Create Dashboard - moved from jdcGrid
//*******************************************************************************
//Defaults for report defnition - Helper function for accessing state properties
function reportDefaults(current,YTDMths){
    var ret = {};
    ret.e = function(){return state.entity();}; //this might be changed
    ret.p = function(){return state.portfolio();};
    ret.u = function(){return state.uom();};

    //ret.c = function(){return current;};
    ret.c = function(){return state.rptPeriod();};
    ret.l = function(){return current-1;};
    ret.ly = function(){return current-12;};
    ret.ytd = function(){return YTDMths;};

    return ret;
}
var def = reportDefaults(numPeriods-1,0);

$(document).ready(function(){
        if(!document.createElement('svg').getAttributeNS){
          document.write('Your browser does not support SVG!');
          return;
        }
});

// Global variable
var anchor,state,rpts = {}, dataDims, pxf, dataNew, dimsEncoded, displayNames;

    function displayFilters(key,long){
        var ret = "";
        //console.log(key);
        for(k in key){
            if(dims[k]){
                var v=f(key[k]);
                if(long===true || v!=='_'){
                    if(ret!==""){ ret+=" - ";};
                    var dimValue = v.label ||  v;
                    if(displayNames[k]) { dimValue = v.label || displayNames[k][v] || v; }
                    if(mres[v]) { dimValue = mres[v].display};
                    ret += dims[k].display + ": " + dimValue;
                }
            }
        }
        return ret;
    }

function shapeNewBusinessData(){

    			function proper(d){
    				return d.toProperCase();
    			}
    			//var data = loadDSV(CSV,",");
    			//console.log(data[0]);

    			dataNew = payLoad(); // console.log(dataNew);
    			console.log(dataNew);
    			console.log(dataNew.data[0]);

    			var dims = ["N","APPLICATION_NUMBER","LTV_IN_SCOPE_FOR_REGS","LTI_IN_SCOPE_FOR_REGS","DATA_SCOPE","FUNDED_POST_REGS_FLAG","REPORTING_CATEGORY","STAGE_PAYMENT_FLAG","FUND_DATE","OFFER_DATE","RCC_AIP_DATE","CHANNEL","BRANCH_REGION","BRANCH_NAME","BROKER_NAME","BROKER_GROUP","LOAN_SIZE","LOAN_TYPE","PROPERTY_STYLE","COUNTY_AREA","LTV_BAND","LTV_BREACH_AMOUNT_BAND","LTV_BREACH_FLAG","LTI_BAND","LTI_BREACH_AMOUNT_BAND","LTI_BREACH_FLAG","DUAL_BREACH_FLAG","RATE_TYPE","PORTFOLIO","IRB_CLASS","REPAYMENT_TYPE","RCC_AIP_DATE_MIN","APP_RECEIVED_DATE","APPLICATION_YEAR","APPLICATION_MONTH"];
    			var mres = ["LOAN_AMOUNT","CURRENT_LOAN_BALANCE","PROPERTY_VALUE","ACTUAL_LTV","LTV_BREACH_AMOUNT","WEIGHTED_LTV_CALC","ACTUAL_LTI","WEIGHTED_LTI_CALC","INTEREST_RATE","LOAN_TERM_YEARS","AGE_OF_VAL_AT_FUNDING_IN_DAYS","FUND_MONTH","FUND_YEAR","OFFER_MONTH","OFFER_YEAR","OFFER_TO_FUND_IN_DAYS"];

    			var dimsInclude = ["FUNDED_POST_REGS_FLAG","REPORTING_CATEGORY","STAGE_PAYMENT_FLAG","CHANNEL","BRANCH_REGION","BRANCH_NAME","LOAN_SIZE","LOAN_TYPE","PROPERTY_STYLE","COUNTY_AREA","LTV_BAND","LTV_BREACH_FLAG","LTI_BAND","LTI_BREACH_FLAG","DUAL_BREACH_FLAG","RATE_TYPE","PORTFOLIO","IRB_CLASS","REPAYMENT_TYPE"];
    			var dimIncludeTransform = [,,,proper,,proper,,proper,,,,,,,,proper,proper,function(d){ return parseInt(d.replace("IRB","")); },proper];
    			var dimsSpecial = ["FUND_DATE","OFFER_DATE","BROKER_NAME","APP_RECEIVED_DATE"];
    			var mresInclude = ["LOAN_AMOUNT","CURRENT_LOAN_BALANCE","PROPERTY_VALUE","ACTUAL_LTV","LTV_BREACH_AMOUNT","LTI_BREACH_AMOUNT","WEIGHTED_LTV_CALC","ACTUAL_LTI","WEIGHTED_LTI_CALC","INTEREST_RATE","LOAN_TERM_YEARS","AGE_OF_VAL_AT_FUNDING_IN_DAYS","OFFER_TO_FUND_IN_DAYS"];

    			function addTransactionDateCharacteristics(tgt,transactionDate){
    				var daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    				var monthsOfYear = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    				var t = new Date(transactionDate);
    				//console.log(tgt); console.log(t);
    				tgt["tYear"] = t.getFullYear();
    				tgt["tMonth"] = monthsOfYear[parseInt(t.getMonth())].substr(0,3);
    				tgt["tDayOfWeek"] = daysOfWeek[t.getDay()].substr(0,3);
    				tgt["tWeekOfMonth"] = parseInt((t.getDate()-1)/7)+1;
    				//tgt["tWeek"] = ;

    			}

    			function updateRecord(tgt,src){
    				dimsInclude.forEach(function(e,i,a){
    					if(dimIncludeTransform[i]){
    						tgt[e] = dimIncludeTransform[i](src[e]);
    					} else {
    						tgt[e] = src[e];
    					}
    				});
    				mresInclude.forEach(function(e,i,a){
    					tgt['values'][e] = [];
    					tgt['values'][e].push(src[e]);
    				});
    			}

    			function createRecord(src, fld, setName){
    				var ret = { "set" : setName, "values" : {} }; //console.log(src);
    				addTransactionDateCharacteristics(ret,src[fld]);
    				updateRecord(ret,src);
    				return ret;
    			}

    			function stackData(data){
    				ret = [];
    				var sets = [
    					{ "fld" : "FUND_DATE", "name" : "Funded" },
    					{ "fld" : "OFFER_DATE", "name" : "Offer" },
    					{ "fld" : "APP_RECEIVED_DATE", "name" : "Application" }
    				];
    				data.forEach(function(e,i,a){
    					if(e["CHANNEL"]==="BROKER"){
    						e["BRANCH_NAME"]===e["BROKER_NAME"];
    					}
    					sets.forEach(function(f,j,b){
    						if(e[f["fld"]]!==null){
                                var o = {};
                                addTransactionDateCharacteristics(o,e[f["fld"]]);
                                if(o["tYear"] === 2015){
                                    ret.push(createRecord(e,f["fld"],f["name"]));
                                }
    						}
    					});
    				});
    				ret.forEach(function(e,i,a){
    					e["values"]["count"] = [1];
                        e["values"]["ew_int_rate"] = [e["values"]["LOAN_AMOUNT"][0]*e["values"]["INTEREST_RATE"][0]];
                        e["values"]["ew_term"] =  [e["values"]["LOAN_AMOUNT"][0]*e["values"]["LOAN_TERM_YEARS"][0]];
    					e["loan_size_band"] = bandMetric(loan_size_bands,e["values"]["LOAN_AMOUNT"][0]);
    					e["lti_band"] = bandMetric(lti_bands,e["values"]["ACTUAL_LTI"][0]);
                        e["term_band"] = bandMetric(term_bands,e["values"]["LOAN_TERM_YEARS"][0]);
                        e["LTIGTReg"] = bandMetric(LTI_Reg_bands,e["values"]["ACTUAL_LTI"][0]);;
                        e["LTVGTReg"] = bandMetric(LTV_Reg_bands,e["values"]["ACTUAL_LTV"][0]);;
                        e["LTVGT100"] = bandMetric(LTV_100_bands,e["values"]["ACTUAL_LTV"][0]);;

    				});
    				return ret;
    			}

    			var loan_size_bands ={
    				values : [5e4,1e5,2.5e5,5e5,1e6],
    				labels : ["<=50K","50K-<=100K","100K-<=250K","250K-<=500K","500K-<=1M",">1M"]
    			}
    			var lti_bands ={
    				values : [1.0,2.0,2.5,3.0,3.5,4.0,4.5,5.0],
    				labels : ["<=1","1-2","2-2.5","2.5-3","3-3.5","3.5-4","4-4.5","4.5-5",">5"]
    			}
                var term_bands ={
                    values : [5,10,15,20,25,30,35,40],
                    labels : ["<=5","5-10","10-15","15-20","20-25","25-30","30-35","35-40",">40"]
                }
                var LTI_Reg_bands ={
    				values : [3.5],
    				labels : ["N","Y"]
    			}
                var LTV_Reg_bands ={
    				values : [80],
    				labels : ["N","Y"]
    			}
                var LTV_100_bands ={
    				values : [100],
    				labels : ["N","Y"]
    			}

                var x = 0;
    			function bandMetric(bands,value){ //if(++x<100) { console.log(value); }
    				var vals = bands.values, labels = bands.labels;
    				if(value>vals[vals.length-1]){
    					return labels[labels.length-1];
    				}
    				for(var e, i=0, a=vals, n=a.length; i<n; i+=1){ e = a[i]; //if(x<100) { console.log(e) };
    					if(value<=e){
    						if(i===0){
    							return labels[0];
    						}
    						return labels[i-1];
    					}
    				}

    			}

    			var data = stackData(dataNew["data"]);
    			console.log(data.length);
    			console.log(data.slice(0,3));

    			console.log(JSON.stringify(Object.keys(data[0])));
    			console.log(JSON.stringify(Object.keys(data[0]['values'])));

    			var dimsTotal = ["set","tYear","tMonth","tDayOfWeek","tWeekOfMonth","FUNDED_POST_REGS_FLAG","REPORTING_CATEGORY","STAGE_PAYMENT_FLAG","CHANNEL","BRANCH_REGION","BRANCH_NAME","LOAN_SIZE","LOAN_TYPE","PROPERTY_STYLE","COUNTY_AREA","LTV_BAND","LTV_BREACH_FLAG","LTI_BAND","LTI_BREACH_FLAG","DUAL_BREACH_FLAG","RATE_TYPE","PORTFOLIO","IRB_CLASS","REPAYMENT_TYPE","loan_size_band","lti_band"];
    			var mresTotal = ["LOAN_AMOUNT","CURRENT_LOAN_BALANCE","PROPERTY_VALUE","ACTUAL_LTV","LTV_BREACH_AMOUNT","LTI_BREACH_AMOUNT","WEIGHTED_LTV_CALC","ACTUAL_LTI","WEIGHTED_LTI_CALC","INTEREST_RATE","LOAN_TERM_YEARS","AGE_OF_VAL_AT_FUNDING_IN_DAYS","OFFER_TO_FUND_IN_DAYS","count","ew_term","ew_int_rate"];

                var dimsToFilter = ["set","tYear","tMonth","tDayOfWeek","tWeekOfMonth","FUNDED_POST_REGS_FLAG","REPORTING_CATEGORY","STAGE_PAYMENT_FLAG","CHANNEL","BRANCH_REGION","BRANCH_NAME","LOAN_TYPE","PROPERTY_STYLE","COUNTY_AREA","LTV_BAND","LTV_BREACH_FLAG","LTI_BREACH_FLAG","DUAL_BREACH_FLAG","RATE_TYPE","PORTFOLIO","IRB_CLASS","REPAYMENT_TYPE","loan_size_band","lti_band","term_band","LTIGTReg","LTVGTReg","LTIGT100"];

                return { "dims":dimsToFilter, "measures":mresTotal, "data":data };

}


function loadReport(){

    $(".splash").slideUp('slow');

    dataNew = shapeNewBusinessData(); // console.log(dataNew);
    //console.log(dataNew);
    //console.log(dataNew.data[0]);

    //*******************************************************************************
    // Create User Interface
    //*******************************************************************************
    anchor = anchorManager(); //then attach handler
    state = stateManager(anchor,dataNew["data"]);

    //Sets up buttons and adds them to state object
    var css = "btn btn-custom";
    var cssBtnSm = "btn btn-custom btn-sm";
    //*******************************************************************************
    //Report Buttons
    //*******************************************************************************
    //Changed to dropdown
    var report = stateElementDropdown(state, "report", "dropdown-style",
        ["Group Overview ","Loan Characteristics", "Credit Characteristics", "Regions", "Counties", "Marimekko"],null,
        [reportChange("rpt"),outputStyle("rpt")]); //Additional Handler to fade in/out pages


    //Handler to add to report state to test output of getComputedStyle
    function outputStyle(id){
        return function(stateObj,refNo){
            return function(){
                var selector = "#" + id + stateObj["controls"][refNo] + " .table" ;
                var element = $(selector)[0];
            }
        }
    }

    //*******************************************************************************
    // Back to UI creation
    //*******************************************************************************
    var rptPortfolio = stateElement(state, "set", css,["All","Applications","Offers","Funded"],["_","Application","Offer","Funded"],null,1,[0,3,2,1]);
    var rptPeriod = stateElement(state, "rptPeriod", cssBtnSm,["YTD 2015"],[0],null,0);
    var rptUOM = stateElement(state, "uom", cssBtnSm,["€", "#"],['LOAN_AMOUNT','count']);

    //*******************************************************************************
    // Set-up Data
    //*******************************************************************************
    dataDims = dataNew['dims'];
    dataDims = ['mre'].concat(dataDims); // Hack to add here - could check for tgt in dProvider and add there
    dimsEncoded = dataNew['dimsEncoded'];
    console.log(JSON.stringify(dimsEncoded));

    var dimsToAddToFilter = [];

    // Helper functions to help with encoded/decoding
    function encodeValueMap(dim, valueMap){
        var ret = {};
        for(var k in valueMap){
            if(dimsEncoded[dim]){
                var mappedValue = dimsEncoded[dim]['values'][k];
                if(mappedValue) {
                    ret[mappedValue] = valueMap[k];
                }
            }
        }
        return ret;
    }

    //*******************************************************************************
    // Helper Functions to print out dims and measures
    //*******************************************************************************
    function printDims(){
        var ret = [];
        dataDims.forEach(function(e,i,a){
            ret.push( {'name' : e, 'value' : i} );
        });
        return ret;
    };

    function printDims(){
        var ret = {};
        dataDims.forEach(function(e,i,a){
            ret[e] = {'display' : e, 'value' : i};
        });
        return ret;
    };

    function printMres(){
        var ret = {};
        dataNew['measures'].forEach(function(e,i,a){
            ret[e] = {'display' : e, 'value' : i};
        });
        return ret;
    };

    console.log(JSON.stringify(printDims()));
    console.log(JSON.stringify(printMres()));
    //*******************************************************************************
    // Helper Functions for pop up chart
    //*******************************************************************************
    //Only used in cell clicked
    function createDisplayNames(){
        var res = {};
        for(var k in dimsEncoded){
            res[k] = dimsEncoded[k]['encoded'];
        }
        return res;
    }
    displayNames = createDisplayNames();

    function dimBtns(selectedDims){
        return selectedDims.map(function(e,i,a){
            return {'name' : dims[e]['display'], 'value' : dims[e]['value']};
        });
    }

    function popupSlice(e){
        updatePopupChart(this.value);
        return false;
    }
    //Needs work to show which are active buttons
    createButtonSet('#popupSlice',dimBtns(popBtns),cssBtnSm,{ click : popupSlice });
    createButtonSet('#popupSliceA',dimBtns(popBtnsA),cssBtnSm,{ click : popupSlice });

    //*******************************************************************************
    // Main data filter/provider
    //*******************************************************************************
    var dbData = dFilterArray({
        'data' : state.data,
        'dims' : dataDims,
        'dimsToAdd'  : dimsToAddToFilter,
        'dimsEncoded' : dimsEncoded,
        'periods' : numPeriods,
        'filtered' : true,
        'cubes' : [],
        'measures' : ["count","LOAN_AMOUNT","CURRENT_LOAN_BALANCE","PROPERTY_VALUE","ACTUAL_LTV","LTV_BREACH_AMOUNT","LTI_BREACH_AMOUNT","WEIGHTED_LTV_CALC","ACTUAL_LTI","WEIGHTED_LTI_CALC","INTEREST_RATE","LOAN_TERM_YEARS","AGE_OF_VAL_AT_FUNDING_IN_DAYS","OFFER_TO_FUND_IN_DAYS"],
        'val' : ['LOAN_AMOUNT','count']
        });
    //console.log(dbData);
    pxf = dProviderArray({ 'dims' : dataDims, 'src' : [{"id" : "_", "data" : dbData }], 'periods' : numPeriods});

    //*******************************************************************************
    //New filter functonality
    //*******************************************************************************

    var filterOptions = {
        'state' : state //should we hook up handlers directly
        ,'source' : dbData //not provider
        ,'container' : '#filterChart svg'
        ,palette : colorbrewer['Blues'][9].reverse()
        ,'dims' : filterDims
        , 'dimsEncoded' : dimsEncoded
    }

    var mainFilter = dDimFilter(filterOptions);
    //console.log(mainFilter);

    // Button Functionality for dDimFilter - to go into dDimFilter
    var resetGraph = d3.selectAll(".reset")
                    .on("click",reset);
    // to go into dDimFilter
    var backGraph = d3.selectAll(".back")
                    .on("click",back);

    function reset(e){ // this needs to change anchor part - should be built into dimFilter
        mainFilter.reset();
    }

    function back(e){ // this needs to change anchor part - should be built into dimFilter
        mainFilter.back();
    }

    // Expand dDimFilter Functionality
    $(".expand").click(function(){
        $("#filterChart").toggleClass("out");
        $("#rptMove").toggleClass("hidden");
        $(".rptPage").toggleClass("hidden");
        $(".expand").html("<<");
        $(".activeTab").fadeOut('fast', // select all active pages
            function(){
                $(".activePage").removeClass("activePage").addClass("inactivePage"); //rptPage
                if($("#filterChart.out").length===0){
                    $(".pg" + state["rptPage"]()).removeClass("inactivePage").addClass("activePage");
                    $(".expand").html(">>");
                }
            })
        .fadeIn('slow');
        mainFilter.chart.update();
    });

    // Expand dDimFilter Functionality
    $(".expandV").click(function(){
        if(mainFilter.expanded()===true){
            $(".expandV").html("Less Filters");
        } else {
            $(".expandV").html("More Filters");
        }
    });

    //*******************************************************************************
    //Page Buttons - inserted before report
    //*******************************************************************************
    function pageChange(id){
        return function(stateObj,refNo){
            return function(){
                // Change active page for all reports
                if(stateObj["updated"]===refNo){
                    $(".activeTab").fadeOut('fast', // select all active pages
                        function(){
                            $(".activePage").removeClass("activePage").addClass("inactivePage");
                            $("." + id + stateObj["controls"][refNo]).removeClass("inactivePage").addClass("activePage"); // only changing active report
                        })
                    .fadeIn('slow');
                }
            }
        }
    }
    var rptPage = stateElement(state, "rptPage", cssBtnSm,["Exposure","Stats", "KPI's"],["0", "1", "2"],[pageChange("pg")]);

    //
    //*******************************************************************************
    //Step 4.2 - Initialise Dashboards
    //*******************************************************************************
    //Initalise reports
    var reportDef0 = rptDef0();
    var reportDef1 = rptDef1();
    var reportDef2 = rptDef2();
    var reportDef3 = rptDef3();
    var reportDef4 = rptDef4();
    /*var reportDef5 = rptDef5();
    var reportDef6 = rptDef6();
    var reportDef7 = rptDef7();*/

    var rptGrp = rpts[reportDef0.name] = rpts[reportDef0.ref] = jdcGrid({source : pxf, def: reportDef0, pageCtrl : state['rptPage'] });
    var rptLoans = rpts[reportDef1.name] = rpts[reportDef1.ref] = jdcGrid({source : pxf, def: reportDef1, pageCtrl : state['rptPage'] });
    var rptCredit = rpts[reportDef2.name] = rpts[reportDef2.ref] = jdcGrid({source : pxf, def: reportDef2, pageCtrl : state['rptPage'] });
    var rptRegions = rpts[reportDef3.name] = rpts[reportDef3.ref] = jdcGrid({source : pxf, def: reportDef3, pageCtrl : state['rptPage'] });
    var rptCounties = rpts[reportDef4.name] = rpts[reportDef4.ref] = jdcGrid({source : pxf, def: reportDef4, pageCtrl : state['rptPage'] });
    /*var rptLTV = rpts[reportDef5.name] = rpts[reportDef5.ref] = jdcGrid({source : pxf, def: reportDef5, pageCtrl : state['rptPage'] });
    var rptGeo = rpts[reportDef6.name] = rpts[reportDef6.ref] = jdcGrid({source : pxf, def: reportDef6, pageCtrl : state['rptPage'] });
    var rptCounties = rpts[reportDef7.name] = rpts[reportDef7.ref] = jdcGrid({source : pxf, def: reportDef7, pageCtrl : state['rptPage'] });*/

    //state.addView({ref:0, update:function(){return 0;}},0);
    state.addView(rptGrp,0);
    state.addView(rptLoans,1);
    state.addView(rptCredit,2);
    state.addView(rptRegions,3);
    state.addView(rptCounties,4);
    /*state.addView(rptLTV,5);
    state.addView(rptGeo,6);
    state.addView(rptCounties,7);*/

    //*******************************************************************************
    // Marimekko chart
    //*******************************************************************************
    //Dims for mekko dropdown to update chart

    /* console.log(JSON.stringify(filterDims.map(function(e,i,a){ // helper to create
        return { "name" : e['name'], "value" : e['name'] };
    }))); */

    var ddMekkoH = {
        container : '#mekkoH',
        type : '.wrapper-dropdown-1',
        events : { 'changed' : function(e){ mekko.update(); } },
        label : 'Horizontal: ',
        values : mekkoDims.map(function(e,i,a){ return e['name'];}),
        map : mekkoDims.map(function(e,i,a){ return e['value'];}),
        initialValue : 'tMonth'
    }

    var ddMekkoV = {
        container : '#mekkoV',
        type : '.wrapper-dropdown-1',
        events : { 'changed' : function(e){ mekko.update(); } },
        label : 'Vertical: ',
        values : mekkoDims.map(function(e,i,a){ return e['name'];}),
        map : mekkoDims.map(function(e,i,a){ return e['value'];}),
        initialValue : 'CHANNEL'
    }

    var ddH = new DropDown(ddMekkoH);
    var ddV = new DropDown(ddMekkoV);

    var mekkoV = function(){ return ddV.getMappedValue(); }
    var mekkoH = function(){ return ddH.getMappedValue(); }

    $(document).click(function() {
        // all dropdowns
        $('.wrapper-dropdown-1').removeClass('active');
    });

    // Options for mekko
    var mekkoOptions = {
        'state' : state //should we hook up handlers directly
        ,'source' : dbData //not provider
        ,'container' : '#mekkoChart svg'
        //,palette : colorbrewer['Blues'][9].reverse()
        ,'dims' : filterDims
        ,'dimsEncoded' : dimsEncoded
        ,'filter' : [mekkoH,mekkoV]
    }

    var mekko = dDimMekko(mekkoOptions);
    //console.log(mekko);

    var rptMekko = rpts["rpt5"] = rpts[5] = mekko;
    state.addView({ref:5, update:rptMekko.update },5); // will add to views and update called when view is active

    //*******************************************************************************
    //Step 5 - Set-up event handler and finalise
    //*******************************************************************************
    $(window) //move this to bottom
        .bind( 'hashchange', function(e) { anchor.onHashchange(e);  } )
    anchor.changeAnchorPart({set:1,report:0});

}
