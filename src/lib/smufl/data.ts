
export const GlyphNames = {
  "accidentalSharp": {
    "alternateCodepoint": "U+266F",
    "codepoint": "U+E262",
    "description": "Sharp"
  },
  "accidentalDoubleSharp": {
    "alternateCodepoint": "U+1D12A",
    "codepoint": "U+E263",
    "description": "Double sharp"
  },
  "accidentalFlat": {
    "alternateCodepoint": "U+266D",
    "codepoint": "U+E260",
    "description": "Flat"
  },
  "accidentalDoubleFlat": {
    "alternateCodepoint": "U+1D12B",
    "codepoint": "U+E264",
    "description": "Double flat"
  },
  "gClef": {
    "alternateCodepoint": "U+1D11E",
    "codepoint": "U+E050",
    "description": "G clef"
  },
  "fClef": {
    "alternateCodepoint": "U+1D122",
    "codepoint": "U+E062",
    "description": "F clef"
  },
  "noteQuarterDown": {
    "codepoint": "U+E1D6",
    "description": "Quarter note (crotchet) stem down"
  },
  "noteQuarterUp": {
    "alternateCodepoint": "U+1D15F",
    "codepoint": "U+E1D5",
    "description": "Quarter note (crotchet) stem up"
  }
} as const;

export const Classes = {
  "accidentals": [
    "accidentalSharp",
    "accidentalDoubleSharp",
    "accidentalFlat",
    "accidentalDoubleFlat"
  ],
  "accidentalsSagittalMixed": [
    "accidentalFlat",
    "accidentalSharp",
    "accidentalDoubleFlat"
  ],
  "accidentalsStandard": [
    "accidentalFlat",
    "accidentalSharp",
    "accidentalDoubleSharp",
    "accidentalDoubleFlat"
  ],
  "clefs": [
    "gClef",
    "fClef"
  ],
  "clefsF": [
    "fClef"
  ],
  "clefsG": [
    "gClef"
  ],
  "combiningStaffPositions": [
    "accidentalSharp",
    "accidentalDoubleSharp",
    "accidentalFlat",
    "accidentalDoubleFlat",
    "noteQuarterDown",
    "noteQuarterUp"
  ],
  "forTextBasedApplications": [
    "noteQuarterDown",
    "noteQuarterUp"
  ]
} as const;

export const FontMeta = {
  "fontName": "Bravura",
  "fontVersion": 1.392,
  "engravingDefaults": {
    "arrowShaftThickness": 0.16,
    "barlineSeparation": 0.4,
    "beamSpacing": 0.25,
    "beamThickness": 0.5,
    "bracketThickness": 0.5,
    "dashedBarlineDashLength": 0.5,
    "dashedBarlineGapLength": 0.25,
    "dashedBarlineThickness": 0.16,
    "hBarThickness": 1,
    "hairpinThickness": 0.16,
    "legerLineExtension": 0.4,
    "legerLineThickness": 0.16,
    "lyricLineThickness": 0.16,
    "octaveLineThickness": 0.16,
    "pedalLineThickness": 0.16,
    "repeatBarlineDotSeparation": 0.16,
    "repeatEndingLineThickness": 0.16,
    "slurEndpointThickness": 0.1,
    "slurMidpointThickness": 0.22,
    "staffLineThickness": 0.13,
    "stemThickness": 0.12,
    "subBracketThickness": 0.16,
    "textEnclosureThickness": 0.16,
    "textFontFamily": [
      "Academico",
      "Century Schoolbook",
      "Edwin",
      "serif"
    ],
    "thickBarlineThickness": 0.5,
    "thinBarlineThickness": 0.16,
    "tieEndpointThickness": 0.1,
    "tieMidpointThickness": 0.22,
    "tupletBracketThickness": 0.16
  },
  "glyphAdvanceWidths": {
    "accidentalSharp": 0.996,
    "accidentalDoubleSharp": 1,
    "accidentalFlat": 0.904,
    "accidentalDoubleFlat": 1.652,
    "gClef": 2.684,
    "fClef": 2.736,
    "noteQuarterDown": 1.328,
    "noteQuarterUp": 1.328
  },
  "glyphBBoxes": {
    "accidentalSharp": {
      "bBoxNE": [
        0.996,
        1.4
      ],
      "bBoxSW": [
        0,
        -1.392
      ]
    },
    "accidentalDoubleSharp": {
      "bBoxNE": [
        0.988,
        0.508
      ],
      "bBoxSW": [
        0,
        -0.5
      ]
    },
    "accidentalFlat": {
      "bBoxNE": [
        0.904,
        1.756
      ],
      "bBoxSW": [
        0,
        -0.7
      ]
    },
    "accidentalDoubleFlat": {
      "bBoxNE": [
        1.644,
        1.748
      ],
      "bBoxSW": [
        0,
        -0.7
      ]
    },
    "gClef": {
      "bBoxNE": [
        2.684,
        4.392
      ],
      "bBoxSW": [
        0,
        -2.632
      ]
    },
    "fClef": {
      "bBoxNE": [
        2.736,
        1.048
      ],
      "bBoxSW": [
        -0.02,
        -2.54
      ]
    },
    "noteQuarterDown": {
      "bBoxNE": [
        1.328,
        0.564
      ],
      "bBoxSW": [
        0,
        -3.5
      ]
    },
    "noteQuarterUp": {
      "bBoxNE": [
        1.328,
        3.5
      ],
      "bBoxSW": [
        0,
        -0.564
      ]
    }
  },
  "glyphsWithAlternates": {
    "accidentalSharp": {
      "alternates": [
        {
          "codepoint": "U+F429",
          "name": "accidentalSharpSmall"
        }
      ]
    },
    "accidentalFlat": {
      "alternates": [
        {
          "codepoint": "U+F427",
          "name": "accidentalFlatSmall"
        }
      ]
    },
    "accidentalDoubleFlat": {
      "alternates": [
        {
          "codepoint": "U+F4A1",
          "name": "accidentalDoubleFlatJoinedStems"
        }
      ]
    },
    "gClef": {
      "alternates": [
        {
          "codepoint": "U+F472",
          "name": "gClefSmall"
        }
      ]
    },
    "fClef": {
      "alternates": [
        {
          "codepoint": "U+F406",
          "name": "fClefFrench"
        },
        {
          "codepoint": "U+F407",
          "name": "fClef19thCentury"
        },
        {
          "codepoint": "U+F474",
          "name": "fClefSmall"
        }
      ]
    }
  },
  "glyphsWithAnchors": {
    "accidentalSharp": {
      "cutOutNE": [
        0.84,
        0.896
      ],
      "cutOutNW": [
        0.144,
        0.568
      ],
      "cutOutSE": [
        0.84,
        -0.596
      ],
      "cutOutSW": [
        0.144,
        -0.896
      ]
    },
    "accidentalFlat": {
      "cutOutNE": [
        0.252,
        0.656
      ],
      "cutOutSE": [
        0.504,
        -0.476
      ]
    },
    "accidentalDoubleFlat": {
      "cutOutNE": [
        0.988,
        0.644
      ],
      "cutOutSE": [
        1.336,
        -0.396
      ]
    }
  }
} as const;
