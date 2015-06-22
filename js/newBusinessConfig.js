//var periods = periodsCreate(201201,35);
var periods = { mth : [20150618], ndx : { 20150618 : 0 }};
console.log(periods);

var dims = {
    "mre":{"display":"mre","value":0},
    "set":{"display":"set","value":1},
    "tYear":{"display":"Year","value":2},
    "tMonth":{"display":"Month","value":3},
    "tDayOfWeek":{"display":"Day (wk)","value":4},
    "tWeekOfMonth":{"display":"Week (mth)","value":5},
    "FUNDED_POST_REGS_FLAG":{"display":"LTV/I Limits","value":6},
    "REPORTING_CATEGORY":{"display":"Category","value":7},
    "STAGE_PAYMENT_FLAG":{"display":"Stage pay","value":8},
    "CHANNEL":{"display":"Channel","value":9},
    "BRANCH_REGION":{"display":"Channel Rgn","value":10},
    "BRANCH_NAME":{"display":"Channel Unit","value":11},
    "LOAN_TYPE":{"display":"Type","value":12},
    "PROPERTY_STYLE":{"display":"Property type","value":13},
    "COUNTY_AREA":{"display":"County (sec)","value":14},
    "LTV_BAND":{"display":"LTV","value":15},
    "LTV_BREACH_FLAG":{"display":"LTV breach","value":16},
    "LTI_BREACH_FLAG":{"display":"LTI breach","value":17},
    "DUAL_BREACH_FLAG":{"display":"Dual breach","value":18},
    "RATE_TYPE":{"display":"Rate type","value":19},
    "PORTFOLIO":{"display":"Portfolio","value":20},
    "IRB_CLASS":{"display":"IRB Grade","value":21},
    "REPAYMENT_TYPE":{"display":"Repay type","value":22},
    "loan_size_band":{"display":"Loan size","value":23},
    "lti_band":{"display":"LTI","value":24},
    "term_band":{"display":"Term","value":25},
    /*"LTIGTReg":{"display":"Term","value":26},
    "LTVGTReg":{"display":"Term","value":27},
    "LTVGT100":{"display":"Term","value":28}*/
    };

var mres = {
        "LOAN_AMOUNT":{"display":"Amount","value":0},
        "CURRENT_LOAN_BALANCE":{"display":"Balance","value":1},
        "PROPERTY_VALUE":{"display":"PROPERTY_VALUE","value":2},
        "ACTUAL_LTV":{"display":"LTV","value":3},
        "LTV_BREACH_AMOUNT":{"display":"LTV Breach","value":4},
        "LTI_BREACH_AMOUNT":{"display":"LTI Breach","value":5},
        "WEIGHTED_LTV_CALC":{"display":"WLTV","value":6},
        "ACTUAL_LTI":{"display":"LTI","value":7},
        "WEIGHTED_LTI_CALC":{"display":"WLTI","value":8},
        "INTEREST_RATE":{"display":"Rate","value":9},
        "LOAN_TERM_YEARS":{"display":"Term (yrs)","value":10},
        "AGE_OF_VAL_AT_FUNDING_IN_DAYS":{"display":"Age Val @ Funding","value":11},
        "OFFER_TO_FUND_IN_DAYS":{"display":"Offer to fund","value":12},
        "count":{"display":"Count","value":13}
    };

var dimOrder = {
    "set":["Funded","Offer","Application"],
    "tYear":[2013,2014,2015],
    "tMonth":["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "tDayOfWeek":["Mon","Tue","Wed","Thu","Fri","Sat"],
    "tWeekOfMonth":[1,2,3,4,5],
    "FUNDED_POST_REGS_FLAG":["Y","N"],
    "REPORTING_CATEGORY":["FTB","STB","SWITCH","NEG. EQ.","CCMA","BTL"],
    "STAGE_PAYMENT_FLAG":["Y","N"],
    "CHANNEL":["Branch","Broker","Ccma"],
    "BRANCH_REGION":["Dublin NW","North East","Departments","South","Dublin NE","CCMA","South East","Dublin South","West","East","South West","North West"].sort(),
    "BRANCH_NAME":["Finglas","Balbriggan","Baggot Street","Douglas","Lower Oconnell Street","Dundalk","Drumcondra","Ccma","Malahide","Liffey Valley","Navan","Hyper Centre","Grafton Street","Rathmines","Tallaght","Newcastlewest","Midleton","Blanchardstown N.t.c.","Dundrum","Bray","Ennis","Walkinstown","Maynooth","Patrick Street","Ballincollig","Eyre Square","Mallow","Tullamore","Wexford","Sligo","Swords","Roscommon","Ballyfermot","Stillorgan","Killarney","Sarsfield Street","Clonmel","Naas","Drogheda","Rathfarnham","Bishopstown","Ashbourne","Cavan","Galway Sc","Kilkenny","Skibbereen","Tralee","Mullingar","Coolock (Northside Sc)","Letterkenny","Dooradoyle","Nenagh","Greystones","Carlow","William Street","Dunmore Road","Artane","Raheny","Portlaoise","Phibsboro","Macroom","New Ross","Carrigaline","Dun Laoghaire","Athlone","Monaghan","Newbridge","Stephen's Green","Castlebar","Gorey","Clonakilty","North Main St","Dungarvan","Tyrellstown","Bandon","Ballina","Mitchelstown","Longford"].sort(),
    "LOAN_TYPE":["Home Loan","N/a","Staff Loan"],
    "PROPERTY_STYLE":["Det","Sem","End","Mid","Bun","Dup","Apa","Tow","Oth","N/A"],
    "COUNTY_AREA":["Dublin","Wicklow","Cork","N/A","Kilkenny","Louth","Waterford","Kildare","Meath","Limerick","Clare","Galway","Offaly","Wexford","Donegal","Sligo","Kerry","Tipperary","Cavan","Roscommon","Carlow","Laois","Westmeath","Monaghan","Mayo","Longford","Leitrim"].sort(),
    "LTV_BAND":["<=50",">50<=55",">55<=60",">60<=65",">65<=70",">70<=75",">75<=80",">80<=85",">85<=90",">90<=95",">95<=100",">100%"],
    "LTV_BREACH_FLAG":["Y","N"],
    "LTI_BREACH_FLAG":["Y","N"],
    "DUAL_BREACH_FLAG":["Y","N"],
    "RATE_TYPE":["Variable","Fixed","N/a"],
    "PORTFOLIO":["Resi Mortgage","Resi Btl Mortgage","Comm Mortgage","N/a"],
    "IRB_CLASS":[16,19,14,20,15,13,21,12,11,10,22,17,18,9,24,23].sort(function(a,b){ return a-b;}),
    "REPAYMENT_TYPE":["Principal & Interest Repayments","null"],
    "loan_size_band":["<=50K","50K-<=100K","100K-<=250K","250K-<=500K","500K-<=1M",">1M"],
    "lti_band":["<=1","1-2","2-2.5","2.5-3","3-3.5","3.5-4","4-4.5","4.5-5",">5"],
    "term_band":["<=5","5-10","10-15","15-20","20-25","25-30","30-35","35-40",">40"]
}

//Buttons for popup chart - NEED to change so updates from dataDims names
var popBtns = ["LOAN_TYPE","PROPERTY_STYLE","COUNTY_AREA","LTV_BAND","LTV_BREACH_FLAG","LTI_BREACH_FLAG","DUAL_BREACH_FLAG","RATE_TYPE","PORTFOLIO","IRB_CLASS","REPAYMENT_TYPE","loan_size_band","lti_band","term_band"];
var popBtnsA = ["set","tYear","tMonth","tDayOfWeek","tWeekOfMonth","FUNDED_POST_REGS_FLAG","REPORTING_CATEGORY","STAGE_PAYMENT_FLAG","CHANNEL","BRANCH_REGION","BRANCH_NAME"];

var filterDimsNew = {
        "set":{"colours":null},
        "tYear":{"colours":null},
        "tMonth":{"colours":null},
        "tDayOfWeek":{"colours":null, 'hide' : true},
        "tWeekOfMonth":{"colours":null, 'hide' : true},
        "FUNDED_POST_REGS_FLAG":{"colours":palettes['binary'].slice(0), 'hide' : true },
        "REPORTING_CATEGORY":{"colours":null},
        "STAGE_PAYMENT_FLAG":{"colours":null},
        "CHANNEL":{"colours":null},
        "BRANCH_REGION":{"colours":null},
        "BRANCH_NAME":{"colours":null, 'hide' : true},
        "LOAN_TYPE":{"colours":null},
        "PROPERTY_STYLE":{"colours":null, 'hide' : true},
        "COUNTY_AREA":{"colours":null},
        "LTV_BAND":{"colours":null},
        "LTV_BREACH_FLAG":{"colours":palettes['binary'].slice(0), 'hide' : true },
        "LTI_BREACH_FLAG":{"colours":palettes['binary'].slice(0), 'hide' : true },
        "DUAL_BREACH_FLAG":{"colours":palettes['binary'].slice(0), 'hide' : true },
        "RATE_TYPE":{"colours":null},
        "PORTFOLIO":{"colours":null},
        "IRB_CLASS":{"colours":null},
        "REPAYMENT_TYPE":{"colours":null},
        "loan_size_band":{"colours":null},
        "lti_band":{"colours":null},
        "term_band":{"colours":null}
    };

var filterDims = [
    "set",
    "PORTFOLIO",
    "LOAN_TYPE",
    "REPORTING_CATEGORY",
    "STAGE_PAYMENT_FLAG",
    "CHANNEL",
    "BRANCH_REGION",
    "BRANCH_NAME",
    "COUNTY_AREA",
    "PROPERTY_STYLE",
    "LTV_BAND",
    "RATE_TYPE",
    "REPAYMENT_TYPE",
    "loan_size_band",
    "term_band",
    "lti_band",
    "IRB_CLASS",
    "tYear",
    "tMonth",
    "tDayOfWeek",
    "tWeekOfMonth",
    "FUNDED_POST_REGS_FLAG",
    "LTV_BREACH_FLAG",
    "LTI_BREACH_FLAG",
    "DUAL_BREACH_FLAG"
    ].map(function(e,i,a){
            var colours = null, hide = null;
            if(filterDimsNew[e]){
                colours = filterDimsNew[e]['colours'];
                hide = filterDimsNew[e]['hide'];
            }
            return {'name' : e, 'display' : dims[e]['display'], 'order' : dimOrder[e],  'colours' : colours, 'hide' : hide};
        });

var mekkoDims = [
    "set",
    "PORTFOLIO",
    "LOAN_TYPE",
    "REPORTING_CATEGORY",
    "STAGE_PAYMENT_FLAG",
    "CHANNEL",
    "BRANCH_REGION",
    "BRANCH_NAME",
    "COUNTY_AREA",
    "PROPERTY_STYLE",
    "LTV_BAND",
    "RATE_TYPE",
    "REPAYMENT_TYPE",
    "loan_size_band",
    "term_band",
    "lti_band",
    "IRB_CLASS",
    "tYear",
    "tMonth",
    "tDayOfWeek",
    "tWeekOfMonth",
    "FUNDED_POST_REGS_FLAG",
    "LTV_BREACH_FLAG",
    "LTI_BREACH_FLAG",
    "DUAL_BREACH_FLAG"
].map(function(e,i,a){
        return {'name' : dims[e]['display'], 'value' : e};
    });
