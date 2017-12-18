export const ANNUAL_ROI_MULTIPLIER = 0.07

export const STATES = [
  'AL',
  'AK',
  'AZ',
  'AR',
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
  'WV',
  'WI',
  'WY'
]

// https://taxfoundation.org/state-individual-income-tax-rates-and-brackets-2016

export const STATE_INCOME_TAX_BRACKETS = {
  AL: {
    0: .02,
    500: .04,
    3000: .05,
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
    0: .0259,
    10179: .0288,
    25445: .0336,
    50890: .0424,
    152688: .0454,
  },
  CA: {
    0: .01,
    8015: .02,
    19001: .03,
    29989: .04,
    41629: .08,
    52612: .093,
    268750: .103,
    322499: .113,
    537498: .123,
    1000000: .133,
  },
  CO: {
    0: .0463,
  },
  CT: {
    0: .03,
    10000: .05,
    50000: .055,
    100000: .06,
    200000: .065,
    250000: .069,
    500000: .0699,
  },
  DC: {
    0: .04,
    10000: .06,
    40000: .065,
    60000: .085,
    35000: .0875,
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
    0: .01,
    750: .02,
    2250: .03,
    3750: .04,
    5250: .05,
    7000: .06,
  },
  HI: {
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
    0: .016,
    1454: .036,
    2908: .041,
    4362: .051,
    5816: .061,
    7270: .071,
    10905: .074,
  },
  IL: {
    0: .0375,
  },
  IN: {
    0: .0323,
  },
  KS: {
    0: .027,
    15000: .046,
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
    0: .02,
    12500: .04,
    50000: .06,
  },
  MA: {
    0: .051,
  },
  MD: {
    0: .02,
    1000: .03,
    2000: .04,
    3000: .0475,
    100000: .05,
    125000: .0525,
    150000: .055,
    250000: .0575,
  },
  ME: {
    0: .058,
    21050: .0675,
    50000: .0715,
    200000: .1015,
  },
  MI: {
    0: .0425,
  },
  MN: {
    0: .0535,
    25390: .0705,
    83400: .0785,
    156911: .0985,
  },
  MS: {
    0: .03,
    5000: .04,
    10000: .05,
  },
  MO: {
    0: .015,
    1008: .02,
    2016: .025,
    3024: .03,
    4032: .035,
    5040: .04,
    6048: .045,
    7056: .05,
    8064: .055,
    9072: .06,
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
    0: .0246,
    3090: .0351,
    18510: .0501,
    29830: .0684,
  },
  NV: {
    0: 0,
  },
  NH: {
    0: .05,
  },
  NJ: {
    0: .014,
    20000: .0175,
    35000: .035,
    40000: .0553,
    75000: .0637,
    500000: .0897,
  },
  NM: {
    0: .017,
    5500: .032,
    11000: .047,
    16000: .049,
  },
  NY: {
    0: .04,
    8500: .045,
    11700: .0525,
    13900: .059,
    21400: .0645,
    80560: .0665,
    215400: .0685,
    1077550: .0882,
  },
  NC: {
    0: .055
  },
  ND: {
    0: .011,
    37950: .0204,
    91900: .0227,
    191650: .0264,
    416700: .029,
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
    0: .005,
    1000: .01,
    2500: .02,
    3750: .03,
    4900: .04,
    7200: .05,
  },
  OR: {
    0: .05,
    3350: .07,
    8450: .09,
    125000: .099,
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
    0: .05,
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
    0: .0355,
    37950: .068,
    91900: .078,
    191650: .088,
    416700: .0895,
  },
  WA: {
    0: 0
  },
  WV: {
    0: .03,
    10000: .04,
    25000: .045,
    40000: .06,
    60000: .065,
  },
  WI: {
    0: .04,
    11230: .0584,
    22470: .0627,
    247350: .0765,
  },
  WY: {
    0: 0
  },
}

export const TAX_FILING_STATUSES = [
  'Single or Head of Household',
  'Married Filing Separately',
  'Married Filing Jointly',
]