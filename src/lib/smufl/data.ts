
export const GlyphNames = {
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
  "noteQuarterUp": {
    "alternateCodepoint": "U+1D15F",
    "codepoint": "U+E1D5",
    "description": "Quarter note (crotchet) stem up"
  },
  "noteQuarterDown": {
    "codepoint": "U+E1D6",
    "description": "Quarter note (crotchet) stem down"
  }
} as const;

export const Classes = {
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
    "noteQuarterUp",
    "noteQuarterDown"
  ],
  "forTextBasedApplications": [
    "noteQuarterUp",
    "noteQuarterDown"
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
    "gClef": 2.684,
    "fClef": 2.736,
    "noteQuarterUp": 1.328,
    "noteQuarterDown": 1.328
  },
  "glyphBBoxes": {
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
    "noteQuarterUp": {
      "bBoxNE": [
        1.328,
        3.5
      ],
      "bBoxSW": [
        0,
        -0.564
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
    }
  },
  "glyphsWithAlternates": {
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
  }
} as const;
