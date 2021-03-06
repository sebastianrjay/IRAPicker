const HEAD_OF_HOUSEHOLD = 'Head of Household'
const MARRIED_FILING_JOINTLY = 'Married Filing Jointly or Qualifying Widow(er)'
const MARRIED_FILING_SEPARATELY = 'Married Filing Separately'
const SINGLE = 'Single'

export const ANNUAL_INFLATION = 0.025

// Assume that assets held in the IRA yield a 7.5% annual Return on Investment
export const ANNUAL_ROI_MULTIPLIER = 0.075

export const FEDERAL_CAPITAL_GAINS_TAX_BRACKETS = {
  [HEAD_OF_HOUSEHOLD]: {
    0: 0,
    51701: .15,
    452401: .20,
  },
  [MARRIED_FILING_JOINTLY]: {
    0: 0,
    77201: .15,
    479001: .20,
  },
  [MARRIED_FILING_SEPARATELY]: {
    0: 0,
    38601: .15,
    239501: .20,
  },
  [SINGLE]: {
    0: 0,
    38601: .15,
    425801: .20,
  },
}

export const FEDERAL_INCOME_TAX_BRACKETS = {
  [HEAD_OF_HOUSEHOLD]: {
    0: .10,
    13351: .15,
    50801: .25,
    131201: .28,
    212501: .33,
    416701: .35,
    444551: .396,
  },
  [MARRIED_FILING_JOINTLY]: {
    0: .10,
    18651: .15,
    75901: .25,
    153101: .28,
    233351: .33,
    416701: .35,
    470701: .396,
  },
  [MARRIED_FILING_SEPARATELY]: {
    0: .10,
    9326: .15,
    37951: .25,
    76551: .28,
    116676: .33,
    208351: .35,
    235351: .396,
  },
  [SINGLE]: {
    0: .10,
    9326: .15,
    37951: .25,
    91901: .28,
    191651: .33,
    416701: .35,
    418401: .396,
  },
}

export const MEDICARE_TAX_MULTIPLIER = .0145

// Income above which Roth IRA contributions cannot be made in full
export const ROTH_IRA_PHASE_OUT_INCOME = 120000

export const SOCIAL_SECURITY_TAX_MULTIPLIER = .062

// https://taxfoundation.org/state-individual-income-tax-rates-and-brackets-2016
// TODO: Divide married and single state income tax brackets
// TODO: Most but not all states have identical capital gains and income taxes
export const STATE_INCOME_TAX_BRACKETS = {
  AL: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .02,
      500: .04,
      3000: .05,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .02,
      1000: .04,
      6000: .05,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .02,
      500: .04,
      3000: .05,
    },
    [SINGLE]: {
      0: .02,
      500: .04,
      3000: .05,
    },
  },
  AK: {
    0: 0,
  },
  AR: {
    0: .009,
    4299: .025,
    8499: .035,
    12799: .045,
    21299: .06,
    35099: .069,
  },
  AZ: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .0259,
      20325: .0288,
      50812: .0336,
      101623: .0424,
      304868: .0454,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .0259,
      20325: .0288,
      50812: .0336,
      101623: .0424,
      304868: .0454,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .0259,
      10163: .0288,
      25406: .0336,
      50812: .0424,
      152434: .0454,
    },
    [SINGLE]: {
      0: .0259,
      10179: .0288,
      25445: .0336,
      50890: .0424,
      152668: .0454,
    },
  },
  CA: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .01,
      16040: .02,
      38003: .04,
      48990: .06,
      60630: .08,
      71615: .093,
      365499: .103,
      438599: .113,
      730997: .123,
      1000000: .133,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .01,
      16030: .02,
      38002: .04,
      59978: .06,
      83258: .08,
      105224: .093,
      537500: .103,
      644998: .113,
      1000000: .123,
      1074996: .133,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .01,
      8015: .02,
      19001: .04,
      29989: .06,
      41629: .08,
      52612: .093,
      268750: .103,
      322499: .113,
      537498: .123,
      1000000: .133,
    },
    [SINGLE]: {
      0: .01,
      8015: .02,
      19001: .04,
      29989: .06,
      41629: .08,
      52612: .093,
      268750: .103,
      322499: .113,
      537498: .123,
      1000000: .133,
    },
  },
  CO: {
    0: .0463,
  },
  CT: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .03,
      16000: .05,
      80000: .055,
      160000: .06,
      320000: .065,
      400000: .069,
      800000: .0699,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .03,
      20000: .05,
      100000: .055,
      200000: .06,
      400000: .065,
      500000: .069,
      1000000: .0699,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .03,
      10000: .05,
      50000: .055,
      100000: .06,
      200000: .065,
      250000: .069,
      500000: .0699,
    },
    [SINGLE]: {
      0: .03,
      10000: .05,
      50000: .055,
      100000: .06,
      200000: .065,
      250000: .069,
      500000: .0699,
    },
  },
  DC: {
    0: .04,
    10000: .06,
    40000: .065,
    60000: .085,
    350000: .0875,
    1000000: .0895,
  },
  DE: {
    2000: .022,
    5000: .039,
    10000: .048,
    20000: .052,
    25000: .0555,
    60000: .066,
  },
  FL: {
    0: 0,
  },
  GA: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .01,
      1000: .02,
      3000: .03,
      5000: .04,
      7000: .05,
      10000: .06,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .01,
      1000: .02,
      3000: .03,
      5000: .04,
      7000: .05,
      10000: .06,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .01,
      750: .02,
      2250: .03,
      3750: .04,
      5250: .05,
      7000: .06,
    },
    [SINGLE]: {
      0: .01,
      750: .02,
      2250: .03,
      3750: .04,
      5250: .05,
      7000: .06,
    },
  },
  HI: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .14,
      3600: .032,
      7200: .055,
      14400: .064,
      21600: .068,
      28800: .072,
      36000: .076,
      54000: .079,
      72000: .0825,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .14,
      4800: .032,
      9600: .055,
      19200: .064,
      28800: .068,
      38400: .072,
      48000: .076,
      72000: .079,
      96000: .0825,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .014,
      2400: .032,
      4800: .055,
      9600: .064,
      14400: .068,
      19200: .072,
      24000: .076,
      36000: .079,
      48000: .0825,
    },
    [SINGLE]: {
      0: .014,
      2400: .032,
      4800: .055,
      9600: .064,
      14400: .068,
      19200: .072,
      24000: .076,
      36000: .079,
      48000: .0825,
    },
  },
  IA: {
    0: .0036,
    1573: .0072,
    3146: .0243,
    6292: .045,
    14157: .0612,
    23595: .0648,
    31460: .068,
    47190: .0792,
    70785: .0898,
  },
  ID: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .016,
      2944: .036,
      5890: .041,
      8834: .051,
      11780: .061,
      14724: .071,
      22086: .074,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .016,
      2944: .036,
      5890: .041,
      8834: .051,
      11780: .061,
      14724: .071,
      22086: .074,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .016,
      1472: .036,
      2945: .041,
      4417: .051,
      5890: .061,
      7362: .071,
      11043: .074,
    },
    [SINGLE]: {
      0: .016,
      1472: .036,
      2945: .041,
      4417: .051,
      5890: .061,
      7362: .071,
      11043: .074,
    },
  },
  IL: {
    0: .0495,
  },
  IN: {
    0: .0323,
  },
  KS: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .029,
      15000: .049,
      30000: .052,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .029,
      30000: .049,
      60000: .052,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .029,
      15000: .049,
      30000: .052,
    },
    [SINGLE]: {
      0: .029,
      15000: .049,
      30000: .052,
    },
  },
  KY: {
    0: .02,
    3000: .03,
    4000: .04,
    5000: .05,
    8000: .058,
    75000: .06,
  },
  LA: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .02,
      12500: .04,
      50000: .06,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .02,
      25000: .04,
      100000: .06,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .02,
      12500: .04,
      50000: .06,
    },
    [SINGLE]: {
      0: .02,
      12500: .04,
      50000: .06,
    },
  },  
  MA: {
    0: .051,
  },
  MD: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .02,
      1000: .03,
      2000: .04,
      3000: .0475,
      150000: .05,
      175000: .0525,
      225000: .055,
      300000: .0575,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .02,
      1000: .03,
      2000: .04,
      3000: .0475,
      100000: .05,
      125000: .0525,
      150000: .055,
      250000: .0575,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .02,
      1000: .03,
      2000: .04,
      3000: .0475,
      150000: .05,
      175000: .0525,
      225000: .055,
      300000: .0575,
    },
    [SINGLE]: {
      0: .02,
      1000: .03,
      2000: .04,
      3000: .0475,
      100000: .05,
      125000: .0525,
      150000: .055,
      250000: .0575,
    },
  },
  ME: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .058,
      31650: .0675,
      75000: .0715,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .058,
      42250: .0675,
      100000: .0715,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .058,
      21100: .0675,
      50000: .0715,
    },
    [SINGLE]: {
      0: .058,
      21100: .0675,
      50000: .0715,
    },
  },
  MI: {
    0: .0425,
  },
  MN: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .0535,
      31260: .0705,
      125600: .0785,
      209200: .0985,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .0535,
      37110: .0705,
      147450: .0785,
      261510: .0985,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .0535,
      18560: .0705,
      73730: .0785,
      130760: .0985,
    },
    [SINGLE]: {
      0: .0535,
      25390: .0705,
      83400: .0785,
      156900: .0985,
    },
  },
  MS: {
    0: .03,
    5000: .04,
    10000: .05,
  },
  MO: {
    0: 0,
    100: .15,
    1000: .02,
    2000: .025,
    3000: .03,
    4000: .035,
    5000: .04,
    6000: .045,
    7000: .05,
    8000: .055,
    9000: .06,
  },
  MT: {
    0: .01,
    2900: .02,
    5200: .03,
    7900: .04,
    10600: .05,
    13600: .06,
    17600: .069,
  },
  NE: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .0246,
      5710: .0351,
      29390: .0501,
      43880: .0684,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .0246,
      6120: .0351,
      36730: .0501,
      59180: .0684,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .0246,
      3060: .0351,
      18370: .0501,
      29590: .0684,
    },
    [SINGLE]: {
      0: .0246,
      3060: .0351,
      18370: .0501,
      29590: .0684,
    },
  },
  NV: {
    0: 0,
  },
  NH: {
    0: 0,
  },
  NJ: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .014,
      20000: .0175,
      50000: .0245,
      70000: .035,
      80000: .05525,
      150000: .0637,
      500000: .0897,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .014,
      20000: .0175,
      50000: .0245,
      70000: .035,
      80000: .05525,
      150000: .0637,
      500000: .0897,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .014,
      20000: .0175,
      35000: .035,
      40000: .05525,
      75000: .0637,
      500000: .0897,
    },
    [SINGLE]: {
      0: .014,
      20000: .0175,
      35000: .035,
      40000: .05525,
      75000: .0637,
      500000: .0897,
    },
  },
  NM: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .017,
      8000: .032,
      16000: .047,
      24000: .049,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .017,
      8000: .032,
      16000: .047,
      24000: .049,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .017,
      4000: .032,
      8000: .047,
      12000: .049,
    },
    [SINGLE]: {
      0: .017,
      5500: .032,
      11000: .047,
      16000: .049,
    },
  },
  NY: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .04,
      12750: .045,
      17550: .0525,
      20800: .059,
      32000: .0645,
      106950: .0665,
      267500: .0685,
      1605650: .0882,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .04,
      17050: .045,
      23450: .0525,
      27750: .059,
      42750: .0645,
      160500: .0665,
      321050: .0685,
      2140900: .0882,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .04,
      8450: .045,
      11650: .0525,
      13850: .059,
      21300: .0645,
      80150: .0665,
      214000: .0685,
      1070350: .0882,
    },
    [SINGLE]: {
      0: .04,
      8450: .045,
      11650: .0525,
      13850: .059,
      21300: .0645,
      80150: .0665,
      214000: .0685,
      1070350: .0882,
    },
  },
  NC: {
    0: .055
  },
  ND: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .011,
      50800: .0204,
      131200: .0227,
      212500: .0264,
      416700: .029,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .011,
      63400: .0204,
      153100: .0227,
      233350: .0264,
      416700: .029,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .011,
      31700: .0204,
      76550: .0227,
      116675: .0264,
      208350: .029,
    },
    [SINGLE]: {
      0: .011,
      37950: .0204,
      91900: .0227,
      191650: .0264,
      416700: .029,
    },
  },
  OH: {
    0: .05,
    5250: .099,
    10500: .0198,
    15800: .0248,
    21100: .0297,
    42100: .0347,
    84200: .0396,
    105300: .046,
    210600: .05,
  },
  OK: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .005,
      2000: .01,
      5000: .02,
      7500: .03,
      9800: .04,
      12200: .05,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .005,
      2000: .01,
      5000: .02,
      7500: .03,
      9800: .04,
      12200: .05,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .005,
      1000: .01,
      2500: .02,
      3750: .03,
      4900: .04,
      7200: .05,
    },
    [SINGLE]: {
      0: .005,
      1000: .01,
      2500: .02,
      3750: .03,
      4900: .04,
      7200: .05,
    },
  },
  OR: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .05,
      6800: .07,
      17000: .09,
      250000: .099,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .05,
      6800: .07,
      17000: .09,
      250000: .099,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .05,
      3400: .07,
      8500: .09,
      125000: .099,
    },
    [SINGLE]: {
      0: .05,
      3400: .07,
      8500: .09,
      125000: .099,
    },
  },
  PA: {
    0: .0307,
  },
  RI: {
    0: .0375,
    61300: .0475,
    139400: .0599,
  },
  SC: {
    0: 0,
    2930: .03,
    5860: .04,
    8790: .05,
    11720: .06,
    14650: .07,
  },
  SD: {
    0: 0,
  },
  TN: {
    0: 0,
  },
  TX: {
    0: 0
  },
  UT: {
    0: .05
  },
  VA: {
    0: .02,
    3000: .03,
    5000: .05,
    17000: .0575,
  },
  VT: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .0355,
      50400: .068,
      130150: .078,
      210800: .088,
      413350: .0895,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .0355,
      62850: .068,
      151900: .078,
      231450: .088,
      413350: .0895,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .0355,
      31425: .068,
      75950: .078,
      115725: .088,
      413350: .0895,
    },
    [SINGLE]: {
      0: .0355,
      37650: .068,
      91150: .078,
      190150: .088,
      413350: .0895,
    },
  },
  WA: {
    0: 0
  },
  WV: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .03,
      10000: .04,
      25000: .045,
      40000: .06,
      60000: .065,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .03,
      10000: .04,
      25000: .045,
      40000: .06,
      60000: .065,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .03,
      5000: .04,
      12500: .045,
      20000: .06,
      30000: .065,
    },
    [SINGLE]: {
      0: .03,
      10000: .04,
      25000: .045,
      40000: .06,
      60000: .065,
    },
  },
  WI: {
    [HEAD_OF_HOUSEHOLD]: {
      0: .04,
      11230: .0584,
      22470: .0627,
      247350: .0765,
    },
    [MARRIED_FILING_JOINTLY]: {
      0: .04,
      14980: .0584,
      29960: .0627,
      329810: .0765,
    },
    [MARRIED_FILING_SEPARATELY]: {
      0: .04,
      7490: .0584,
      14980: .0627,
      164900: .0765,
    },
    [SINGLE]: {
      0: .04,
      11230: .0584,
      22470: .0627,
      247350: .0765,
    },
  },
  WY: {
    0: 0
  },
}

export const STATE_CAPITAL_GAINS_TAX_BRACKETS = STATE_INCOME_TAX_BRACKETS

export const STATES = [
  'AL',
  'AK',
  'AR',
  'AZ',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WI',
  'WV',
  'WY'
]

export const TAX_FILING_STATUSES = [
  HEAD_OF_HOUSEHOLD,
  MARRIED_FILING_JOINTLY,
  MARRIED_FILING_SEPARATELY,
  SINGLE,
]

export const TRADITIONAL_IRA_DEDUCTION_INCOME_LIMITS = {
  has401k: {
    false: {
      [SINGLE]: null,
      [HEAD_OF_HOUSEHOLD]: null,
      [MARRIED_FILING_JOINTLY]: {
        spouseHas401k: {
          false: null,
          true: 189000,
        },
      },
      [MARRIED_FILING_SEPARATELY]: {
        spouseHas401k: {
          false: null,
          true: 0,
        },
      },
    },
    true: {
      [SINGLE]: 63000,
      [HEAD_OF_HOUSEHOLD]: 63000,
      [MARRIED_FILING_JOINTLY]: {
        spouseHas401k: {
          false: 101000,
          true: 101000,
        },
      },
      [MARRIED_FILING_SEPARATELY]: {
        spouseHas401k: {
          false: 0,
          true: 0,
        },
      },
    },
  },
}

// Sum of highest federal and state marginal capital gains tax rates
export const UPPER_BOUND_CAPITAL_GAINS_TAX_MULTIPLIER = .333

// Sum of highest federal and state marginal income tax rates, and Medicare and 
// Social Security tax rates
export const UPPER_BOUND_INCOME_TAX_MULTIPLIER = .6055
