// Sample data for the ScoreSync Judge Portal demo (demo.scoresync.net).
// Two fictional events, matching the two real rubric backups Austin
// exported from the Rubric Builder:
//   - Chapter Yearbook — a Contest (no ranking ties flagged), 5 sample chapters.
//   - Children's Literature K-3 English (JV & V) — a Competition, split into
//     Varsity and Junior Varsity, so the Live Ranking panel's tie-flagging
//     (Contest vs. Competition) has something real to show. Two Varsity
//     entries (v1, v2) are seeded with matching scores from the two
//     pre-filled demo judges on purpose, so a TIE badge is visible in Live
//     Ranking the moment you open it — that's the whole point of this file.
// All schools, students, and chapters below are fictional, for demo
// purposes only.
//
// This file only ever seeds a FRESH demo (see vendor/firebase-app.js) —
// once a judge starts scoring, their own browser's localStorage takes over
// until they (or you) click "Reset Demo Data".
window.DEMO_SEED = {
  "db": {
    "conferences": {
      "demoConf": {
        "name": "ScoreSync Demo Conference",
        "active": true,
        "noTiesTopN": 3
      }
    },
    "events": {
      "evtYearbook": {
        "name": "Chapter Yearbook",
        "conferenceId": "demoConf",
        "active": true,
        "prefix": "CY",
        "rubricId": "rubYB"
      },
      "evtLit": {
        "name": "Children's Literature K-3 English (JV & V)",
        "conferenceId": "demoConf",
        "active": true,
        "prefix": "CL",
        "rubricId": "rubLit"
      }
    },
    "eventCodes": {
      "ecLit": {
        "prefix": "CL",
        "eventType": "competition",
        "splitByDivision": true
      }
    },
    "eventCodeOverrides": {},
    "panels": {
      "panelYB": {
        "name": "Yearbook Judging Table",
        "eventId": "evtYearbook",
        "location": "Library — Table 3"
      },
      "panelLit": {
        "name": "Children's Lit Judging Table",
        "eventId": "evtLit",
        "location": "Media Center — Table 1"
      }
    },
    "users": {
      "demoJudge": {
        "roles": [
          "judge"
        ],
        "enabled": true,
        "conferenceId": "demoConf",
        "assignedPanels": [
          "panelYB",
          "panelLit"
        ],
        "firstName": "Demo",
        "lastName": "Judge",
        "email": "demo@judge.scoresync.net"
      },
      "otherJudgeA": {
        "roles": [
          "judge"
        ],
        "enabled": true,
        "conferenceId": "demoConf",
        "assignedPanels": [
          "panelYB",
          "panelLit"
        ],
        "firstName": "Priya",
        "lastName": "Nolan",
        "email": "priya.nolan@example.com"
      },
      "otherJudgeB": {
        "roles": [
          "judge"
        ],
        "enabled": true,
        "conferenceId": "demoConf",
        "assignedPanels": [
          "panelYB",
          "panelLit"
        ],
        "firstName": "Marcus",
        "lastName": "Ibe",
        "email": "marcus.ibe@example.com"
      }
    },
    "usersPending": {},
    "timeSlots": {},
    "entryChangeRequests": {},
    "accessLogs": {},
    "bugReports": {},
    "scheduleItems": {},
    "conferenceMessages": {},
    "entries": {
      "cy1": {
        "eventId": "evtYearbook",
        "conferenceId": "demoConf",
        "panelId": "panelYB",
        "formId": "CY101",
        "school": "Ridgeline High School",
        "competitors": "Ridgeline FCCLA Chapter",
        "assignedJudgeUids": [
          "demoJudge",
          "otherJudgeA",
          "otherJudgeB"
        ]
      },
      "cy2": {
        "eventId": "evtYearbook",
        "conferenceId": "demoConf",
        "panelId": "panelYB",
        "formId": "CY102",
        "school": "Brookhaven High School",
        "competitors": "Brookhaven FCCLA Chapter",
        "assignedJudgeUids": [
          "demoJudge",
          "otherJudgeA",
          "otherJudgeB"
        ]
      },
      "cy3": {
        "eventId": "evtYearbook",
        "conferenceId": "demoConf",
        "panelId": "panelYB",
        "formId": "CY103",
        "school": "Oakmont High School",
        "competitors": "Oakmont FCCLA Chapter",
        "assignedJudgeUids": [
          "demoJudge",
          "otherJudgeA",
          "otherJudgeB"
        ]
      },
      "cy4": {
        "eventId": "evtYearbook",
        "conferenceId": "demoConf",
        "panelId": "panelYB",
        "formId": "CY104",
        "school": "Pine Valley High School",
        "competitors": "Pine Valley FCCLA Chapter",
        "assignedJudgeUids": [
          "demoJudge",
          "otherJudgeA",
          "otherJudgeB"
        ]
      },
      "cy5": {
        "eventId": "evtYearbook",
        "conferenceId": "demoConf",
        "panelId": "panelYB",
        "formId": "CY105",
        "school": "Cedar Ridge High School",
        "competitors": "Cedar Ridge FCCLA Chapter",
        "assignedJudgeUids": [
          "demoJudge",
          "otherJudgeA",
          "otherJudgeB"
        ]
      },
      "v1": {
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "panelId": "panelLit",
        "formId": "CL201",
        "division": "Varsity",
        "school": "Willow Creek High School",
        "competitors": "Maya Chen & Jordan Ruiz — “The Kite and the Wind”",
        "assignedJudgeUids": [
          "demoJudge",
          "otherJudgeA",
          "otherJudgeB"
        ]
      },
      "v2": {
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "panelId": "panelLit",
        "formId": "CL202",
        "division": "Varsity",
        "school": "Fairhaven High School",
        "competitors": "Sofia Alvarez & Ben Whitfield — “Luna's Lighthouse”",
        "assignedJudgeUids": [
          "demoJudge",
          "otherJudgeA",
          "otherJudgeB"
        ]
      },
      "v3": {
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "panelId": "panelLit",
        "formId": "CL203",
        "division": "Varsity",
        "school": "Crestview High School",
        "competitors": "Amara Johnson & Theo Park — “The Paper Boat Parade”",
        "assignedJudgeUids": [
          "demoJudge",
          "otherJudgeA",
          "otherJudgeB"
        ]
      },
      "jv1": {
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "panelId": "panelLit",
        "formId": "CL211",
        "division": "Junior Varsity",
        "school": "Elmwood High School",
        "competitors": "Grace Kim & Owen Dupree — “Bramble the Brave”",
        "assignedJudgeUids": [
          "demoJudge",
          "otherJudgeA",
          "otherJudgeB"
        ]
      },
      "jv2": {
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "panelId": "panelLit",
        "formId": "CL212",
        "division": "Junior Varsity",
        "school": "Northgate High School",
        "competitors": "Ivy Thompson & Caleb Reyes — “The Whispering Garden”",
        "assignedJudgeUids": [
          "demoJudge",
          "otherJudgeA",
          "otherJudgeB"
        ]
      },
      "jv3": {
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "panelId": "panelLit",
        "formId": "CL213",
        "division": "Junior Varsity",
        "school": "Southport High School",
        "competitors": "Nadia Farouk & Milo Sanders — “Stardust Soup”",
        "assignedJudgeUids": [
          "demoJudge",
          "otherJudgeA",
          "otherJudgeB"
        ]
      }
    },
    "rubrics": {
      "rubYB": {
        "title": "Chapter Yearbook",
        "sections": [
          {
            "section": "Cover, Title, and Table of Contents",
            "max": 9,
            "criteria": [
              {
                "name": "Cover Color Scheme, artwork and theme",
                "description": "",
                "max": 3,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": ""
                  },
                  {
                    "label": "Does Not Adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": ""
                  }
                ]
              },
              {
                "name": "Title Page with school name, address, chapter size and school size",
                "description": "",
                "max": 3,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": ""
                  },
                  {
                    "label": "Does Not Adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": ""
                  }
                ]
              },
              {
                "name": "Table of Contents including page numbers ",
                "description": "",
                "max": 3,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": ""
                  },
                  {
                    "label": "Does Not Adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": ""
                  }
                ]
              }
            ]
          },
          {
            "section": "Chapter Operations",
            "max": 9,
            "criteria": [
              {
                "name": "Opening Sections with letter from the Teacher Leader with signature",
                "description": "",
                "max": 3,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": ""
                  },
                  {
                    "label": "Does Not Adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": ""
                  }
                ]
              },
              {
                "name": "Description of Cover Theme ",
                "description": "",
                "max": 3,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": ""
                  },
                  {
                    "label": "Does Not Adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": ""
                  }
                ]
              },
              {
                "name": "Chapter and Operations- including agendas, minutes, reports, officers and representatives",
                "description": "",
                "max": 3,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": ""
                  },
                  {
                    "label": "Does Not Adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": ""
                  }
                ]
              }
            ]
          },
          {
            "section": "Projects, Activities, and Participation",
            "max": 27,
            "criteria": [
              {
                "name": "Area Activities",
                "description": "",
                "max": 3,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": ""
                  },
                  {
                    "label": "Does Not Adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": ""
                  }
                ]
              },
              {
                "name": "State Activities (previous year)",
                "description": "",
                "max": 3,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": ""
                  },
                  {
                    "label": "Does Not Adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": ""
                  }
                ]
              },
              {
                "name": "Teaching/Classroom Participation",
                "description": "",
                "max": 3,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": ""
                  },
                  {
                    "label": "Does Not Adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": ""
                  }
                ]
              },
              {
                "name": "Recreation/Social Activities",
                "description": "",
                "max": 3,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": ""
                  },
                  {
                    "label": "Does Not Adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": ""
                  }
                ]
              },
              {
                "name": "Appreciation Activities (Teacher/Faculty)",
                "description": "",
                "max": 3,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": ""
                  },
                  {
                    "label": "Does Not Adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": ""
                  }
                ]
              },
              {
                "name": "Fundraising Projects",
                "description": "",
                "max": 3,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": ""
                  },
                  {
                    "label": "Does Not Adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": ""
                  }
                ]
              },
              {
                "name": "Leadership Activities ",
                "description": "",
                "max": 3,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": ""
                  },
                  {
                    "label": "Does Not Adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": ""
                  }
                ]
              },
              {
                "name": "Education Awareness Activities",
                "description": "",
                "max": 3,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": ""
                  },
                  {
                    "label": "Does Not Adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": ""
                  }
                ]
              },
              {
                "name": "Service Projects",
                "description": "",
                "max": 3,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": ""
                  },
                  {
                    "label": "Does Not Adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": ""
                  }
                ]
              }
            ]
          },
          {
            "section": "Mechanics",
            "max": 10,
            "criteria": [
              {
                "name": "Grammar and Spelling ",
                "description": "",
                "max": 5,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 5,
                    "min": 4,
                    "max": 5,
                    "mode": "range",
                    "text": "Void of intrusive grammar and spelling errors."
                  },
                  {
                    "label": "Proficient",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": "Few noticeable grammar and spelling errors."
                  },
                  {
                    "label": "Developing",
                    "points": 2,
                    "min": 1,
                    "max": 2,
                    "mode": "range",
                    "text": "Noticeable intrusive grammar and spelling errors."
                  }
                ]
              },
              {
                "name": "Same Order as judging form",
                "description": "",
                "max": 5,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 5,
                    "min": 4,
                    "max": 5,
                    "mode": "range",
                    "text": "Chapter Yearbook is in the order of the feedback and tally sheet/detailed scoring rubric."
                  },
                  {
                    "label": "Proficient",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": "Chapter Yearbook is mostly in the order of the feedback and tally sheet/detailed scoring rubric."
                  },
                  {
                    "label": "Developing",
                    "points": 2,
                    "min": 1,
                    "max": 2,
                    "mode": "range",
                    "text": "Chapter Yearbook has many pages out of order of the feedback and tally sheet/detailed scoring rubric."
                  }
                ]
              }
            ]
          },
          {
            "section": "Creativity",
            "max": 15,
            "criteria": [
              {
                "name": "Embellishment",
                "description": "",
                "max": 5,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 5,
                    "min": 4,
                    "max": 5,
                    "mode": "range",
                    "text": "Decorations and/or Ornamentations contribute in a meaningful way to theme and information."
                  },
                  {
                    "label": "Proficient",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": "Some Decorations and/or Ornamentations do not contribute in a meaningful way to theme or information."
                  },
                  {
                    "label": "Developing",
                    "points": 2,
                    "min": 1,
                    "max": 2,
                    "mode": "range",
                    "text": "Decorations and/or Ornamentations either do not contribute in a meaningful way or distracts from theme and information."
                  }
                ]
              },
              {
                "name": "Neatness",
                "description": "",
                "max": 5,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 5,
                    "min": 4,
                    "max": 5,
                    "mode": "range",
                    "text": "Adhesives (tape, glue, etc.) not visible; cut edges of paper straight and smooth; meticulousness/care in assembling book apparent."
                  },
                  {
                    "label": "Proficient",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": "Adhesives (tape, glue, etc.) somewhat visible; some cut edges of paper not straight and smooth. Care in assembling book not apparent."
                  },
                  {
                    "label": "Developing",
                    "points": 2,
                    "min": 1,
                    "max": 2,
                    "mode": "range",
                    "text": "Adhesives (tape, glue, etc.) obviously visible; many cut edges of paper not straight and smooth. Little or no care in assembling book."
                  }
                ]
              },
              {
                "name": "Overall Creativity",
                "description": "",
                "max": 5,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 5,
                    "min": 4,
                    "max": 5,
                    "mode": "range",
                    "text": "Unique implementation of creative/imaginative ideas."
                  },
                  {
                    "label": "Proficient",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": "Inspired from other sources and not totally unique."
                  },
                  {
                    "label": "Developing",
                    "points": 2,
                    "min": 1,
                    "max": 2,
                    "mode": "range",
                    "text": "Obvious implementation of other sources and does not reflect students’ own ideas."
                  }
                ]
              }
            ]
          },
          {
            "section": "Student Presentation",
            "max": 30,
            "criteria": [
              {
                "name": "Introduction of presenters and chapter",
                "description": "",
                "max": 5,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 5,
                    "min": 4,
                    "max": 5,
                    "mode": "range",
                    "text": "Names of presenters; school; district and city are clearly articulated."
                  },
                  {
                    "label": "Proficient",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": "Two or three of the following are omitted: Names of presenters; school; district and city, or are given only after judges prompting."
                  },
                  {
                    "label": "Developing",
                    "points": 2,
                    "min": 1,
                    "max": 2,
                    "mode": "range",
                    "text": "Four or all of the following are omitted: Title of project; Names of presenters; school; district and city, or are given only after judges prompting."
                  }
                ]
              },
              {
                "name": "Theme and Content Description",
                "description": "",
                "max": 5,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 5,
                    "min": 4,
                    "max": 5,
                    "mode": "range",
                    "text": "Theme and content clearly explained."
                  },
                  {
                    "label": "Proficient",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": "Theme or content not completely explained."
                  },
                  {
                    "label": "Developing",
                    "points": 2,
                    "min": 1,
                    "max": 2,
                    "mode": "range",
                    "text": "Theme and content not clearly explained."
                  }
                ]
              },
              {
                "name": "Construction Description",
                "description": "",
                "max": 5,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 5,
                    "min": 4,
                    "max": 5,
                    "mode": "range",
                    "text": "Team members explains the construction process in a knowledgeable way that demonstrates familiarity with chapter projects."
                  },
                  {
                    "label": "Proficient",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": "Team members explanation of the construction processor limited or lacks knowledge of chapter projects."
                  },
                  {
                    "label": "Developing",
                    "points": 2,
                    "min": 1,
                    "max": 2,
                    "mode": "range",
                    "text": "Team members explanation of the construction processor limited and lacks knowledge of chapter projects."
                  }
                ]
              },
              {
                "name": "Knowledgeable response to questions",
                "description": "",
                "max": 5,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 5,
                    "min": 4,
                    "max": 5,
                    "mode": "range",
                    "text": "Team members fully respond with complete sentences."
                  },
                  {
                    "label": "Proficient",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": "Some responses incomplete or not answered in complete sentences."
                  },
                  {
                    "label": "Developing",
                    "points": 2,
                    "min": 1,
                    "max": 2,
                    "mode": "range",
                    "text": "Responses incomplete and not answered in complete sentences."
                  }
                ]
              },
              {
                "name": "Enthusiastic",
                "description": "",
                "max": 5,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 5,
                    "min": 4,
                    "max": 5,
                    "mode": "range",
                    "text": "Energetic interest in book is apparent."
                  },
                  {
                    "label": "Proficient",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": "Little energy or interest in book is apparent."
                  },
                  {
                    "label": "Developing",
                    "points": 2,
                    "min": 1,
                    "max": 2,
                    "mode": "range",
                    "text": "No energy or interest in book is apparent; lackluster presentation."
                  }
                ]
              },
              {
                "name": "Posture upright and professional & Eye Contact",
                "description": "",
                "max": 5,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 5,
                    "min": 4,
                    "max": 5,
                    "mode": "range",
                    "text": "All members stand upright with shoulders back. Members maintain appropriate eye contact with judges."
                  },
                  {
                    "label": "Proficient",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": "Most but not all members stand upright with shoulders back. Some members do not maintain appropriate eye contact with judges."
                  },
                  {
                    "label": "Developing",
                    "points": 2,
                    "min": 1,
                    "max": 2,
                    "mode": "range",
                    "text": "Most members do not stand upright with shoulders back. Most members members do not maintain appropriate eye contact with judges."
                  }
                ]
              }
            ]
          }
        ],
        "totalPoints": 100,
        "sectionCount": 6,
        "criteriaCount": 26,
        "timeLimitSeconds": 600
      },
      "rubLit": {
        "title": "Children's Literature K-3 English (JV & V)",
        "sections": [
          {
            "section": "Literary Content",
            "max": 40,
            "criteria": [
              {
                "name": "Story",
                "description": "",
                "max": 20,
                "preScored": true,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 20,
                    "min": 16,
                    "max": 20,
                    "mode": "range",
                    "text": "Highly engaging, original story. Theme is woven throughout. Strong emotional or educational impact. Reflects professional caliber children’s literature."
                  },
                  {
                    "label": "Commendble",
                    "points": 15,
                    "min": 11,
                    "max": 15,
                    "mode": "range",
                    "text": "Strong story with minor areas for improvement in depth or originality. Theme is mostly integrated. Contains a generally successful ending. Reflects commendable student-level work."
                  },
                  {
                    "label": "Developing",
                    "points": 10,
                    "min": 6,
                    "max": 10,
                    "mode": "range",
                    "text": "Story shows potential but lacks depth, cohesion, or full thematic integration. Ending may not fully engage or satisfy the audience. Reflects developing student-level work."
                  },
                  {
                    "label": "Needs Improvement",
                    "points": 5,
                    "min": 1,
                    "max": 5,
                    "mode": "range",
                    "text": "Underdeveloped story that does not meet varsity expectations. Story may reflect stereotypes or biases that are not appropriate for mainstream children’s literature."
                  }
                ]
              },
              {
                "name": "Illustrations/ Visuals",
                "description": "",
                "max": 20,
                "preScored": true,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 20,
                    "min": 16,
                    "max": 20,
                    "mode": "range",
                    "text": "Illustrations significantly enhance meaning. Highly consistent, polished, and professional-quality visual storytelling."
                  },
                  {
                    "label": "Commendable",
                    "points": 15,
                    "min": 11,
                    "max": 15,
                    "mode": "range",
                    "text": "Strong illustrations with minor gaps in cohesion or refinement."
                  },
                  {
                    "label": "Developing",
                    "points": 10,
                    "min": 6,
                    "max": 10,
                    "mode": "range",
                    "text": "Visuals show effort but lack clarity, cohesion, or strong contribution to meaning."
                  },
                  {
                    "label": "Beginning",
                    "points": 5,
                    "min": 1,
                    "max": 5,
                    "mode": "range",
                    "text": "Visuals do not effectively support the story."
                  }
                ]
              }
            ]
          },
          {
            "section": "Text Mechanics",
            "max": 5,
            "criteria": [
              {
                "name": "Text Mechanics",
                "description": "",
                "max": 5,
                "preScored": true,
                "deduction": false,
                "levels": [
                  {
                    "label": "Flawless",
                    "points": 5,
                    "min": 5,
                    "max": 5,
                    "mode": "absolute",
                    "text": "Mechanics — including grammar, spelling, punctuation, capitalization, etc. — are flawlessly appropriate for this work of children’s literature. (well- used colloquialisms are permitted and encouraged where appropriate.)"
                  },
                  {
                    "label": "One to two errors",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": "Mechanics — including grammar, spelling, punctuation, capitalization, etc. — contain one or two errors."
                  },
                  {
                    "label": "More than two errors",
                    "points": 1,
                    "min": 1,
                    "max": 1,
                    "mode": "absolute",
                    "text": "Mechanics — including grammar, spelling, punctuation, capitalization, etc. — contain more than two errors."
                  }
                ]
              }
            ]
          },
          {
            "section": "Guideline Adherence",
            "max": 22,
            "criteria": [
              {
                "name": "Statement of Originality",
                "description": "",
                "max": 2,
                "preScored": true,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 2,
                    "min": 2,
                    "max": 2,
                    "mode": "absolute",
                    "text": "Submitted as last page of book."
                  },
                  {
                    "label": "Does not adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": "Not Submitted or not as the last page of the book or incomplete."
                  }
                ]
              },
              {
                "name": "Title Page",
                "description": "",
                "max": 2,
                "preScored": true,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 2,
                    "min": 2,
                    "max": 2,
                    "mode": "absolute",
                    "text": "The title page includes the title of the story, appropriate age of the audience, author, illustrator (if different from author), teacher leader’s name, school, contact information: student’s email and high school address."
                  },
                  {
                    "label": "Does not adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": "The title page does not include the title of the story, appropriate age of the audience, author, illustrator (if different from author), teacher leader’s name, school, contact information: student’s email and high school address."
                  }
                ]
              },
              {
                "name": "Book’s Physical Size",
                "description": "",
                "max": 2,
                "preScored": true,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 2,
                    "min": 2,
                    "max": 2,
                    "mode": "absolute",
                    "text": "Book is bound, and size is less than or equal to 14” x 22”"
                  },
                  {
                    "label": "Does not adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": "Book is not bound and/or size is greater than 14” x 22”"
                  }
                ]
              },
              {
                "name": "Page Limit",
                "description": "",
                "max": 2,
                "preScored": true,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 2,
                    "min": 2,
                    "max": 2,
                    "mode": "absolute",
                    "text": "Book is no more than 28 pages front only or 14 pages front/back excluding title/credit page/statement of originality"
                  },
                  {
                    "label": "Does not adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": "Book exceeds 28 pages front only or 14 pages front/back excluding title/credit page/statement of originality"
                  }
                ]
              },
              {
                "name": "Word Count",
                "description": "",
                "max": 2,
                "preScored": true,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 2,
                    "min": 2,
                    "max": 2,
                    "mode": "absolute",
                    "text": "Story is between 800-3,000 words and is documented on the statement of originality."
                  },
                  {
                    "label": "Does not adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": "Store does not adhere to word count and is either less than 800 or more than 3,000 words."
                  }
                ]
              },
              {
                "name": "Aligned to K-3 Standard",
                "description": "",
                "max": 2,
                "preScored": true,
                "deduction": false,
                "levels": [
                  {
                    "label": "Adheres",
                    "points": 2,
                    "min": 2,
                    "max": 2,
                    "mode": "absolute",
                    "text": "Story is aligned to K-3 Standards and documented on the Statement of Originality."
                  },
                  {
                    "label": "Does not adhere",
                    "points": 0,
                    "min": 0,
                    "max": 0,
                    "mode": "absolute",
                    "text": "Story is not aligned to K-3 Standards or not listed on the Statement of Originality."
                  }
                ]
              },
              {
                "name": "Age Appropriate and K-3 Standard Alignment",
                "description": "Focus: Strong alignment, purpose, and instructional value",
                "max": 10,
                "preScored": true,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 10,
                    "min": 9,
                    "max": 10,
                    "mode": "range",
                    "text": "The book is highly appropriate for K-3 learners and reflects a strong understanding of developmental needs. Skillfully aligns to a specific state K-3 (academic or social-emotional), standard intentionally and seamlessly embedded in the story."
                  },
                  {
                    "label": "Commendable",
                    "points": 8,
                    "min": 6,
                    "max": 8,
                    "mode": "range",
                    "text": "The book is appropriate and clearly aligned to a K-3 standard. The connection is meaningful, though not fully refined."
                  },
                  {
                    "label": "Developing",
                    "points": 5,
                    "min": 3,
                    "max": 5,
                    "mode": "range",
                    "text": "The book shows developing understanding of K-3 standards. Alignment is present but may lack clarity or depth."
                  },
                  {
                    "label": "Needs Improvement",
                    "points": 2,
                    "min": 1,
                    "max": 2,
                    "mode": "range",
                    "text": "The book is not developmentally appropriate and does not align to K-3 standards or domains."
                  }
                ]
              }
            ]
          },
          {
            "section": "Live Reading Presentation",
            "max": 60,
            "criteria": [
              {
                "name": "Vocal Delivery",
                "description": "Focus: Advanced delivery, impact, and artistry",
                "max": 20,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 20,
                    "min": 16,
                    "max": 20,
                    "mode": "range",
                    "text": "Voice is expertly controlled with purposeful pacing, tone, and modulation that enhances meaning and emotional impact."
                  },
                  {
                    "label": "Commendable",
                    "points": 15,
                    "min": 11,
                    "max": 15,
                    "mode": "range",
                    "text": "Voice is strong and controlled with effective variation in tone and pacing. Meaning is clear and engaging."
                  },
                  {
                    "label": "Developing",
                    "points": 10,
                    "min": 6,
                    "max": 10,
                    "mode": "range",
                    "text": "Voice is generally clear but lacks consistent control or dynamic range. Greater impact is possible."
                  },
                  {
                    "label": "Needs Improvement",
                    "points": 5,
                    "min": 1,
                    "max": 5,
                    "mode": "range",
                    "text": "Voice is inconsistent or distracting. Weak control of pacing and tone limits audience engagement."
                  }
                ]
              },
              {
                "name": "Presence",
                "description": "Focus: Professionalism and performance impact",
                "max": 20,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 20,
                    "min": 16,
                    "max": 20,
                    "mode": "range",
                    "text": "Commanding presence with sustained eye contact, intentional posture, and a professional demeanor that elevates the performance. All team members contribute to impact."
                  },
                  {
                    "label": "Commendable",
                    "points": 15,
                    "min": 11,
                    "max": 15,
                    "mode": "range",
                    "text": "Strong presence with minor inconsistencies. Supports the overall performance effectively."
                  },
                  {
                    "label": "Developing",
                    "points": 10,
                    "min": 6,
                    "max": 10,
                    "mode": "range",
                    "text": "Presence is inconsistent. Greater focus and intentionality would improve impact."
                  },
                  {
                    "label": "Needs Improvement",
                    "points": 5,
                    "min": 1,
                    "max": 5,
                    "mode": "range",
                    "text": "Presence is distracting or disengaged. Lack of professionalism reduces effectiveness."
                  }
                ]
              },
              {
                "name": "Q&A",
                "description": "",
                "max": 20,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 20,
                    "min": 16,
                    "max": 20,
                    "mode": "range",
                    "text": "The competitors’ responses demonstrated consistent thoughtfulness and professional-caliber insight, rooted in reflexivity about the book."
                  },
                  {
                    "label": "Commendable",
                    "points": 15,
                    "min": 11,
                    "max": 15,
                    "mode": "range",
                    "text": "The competitors’ responses demonstrated thoughtfulness and reflected successful attempts to address most of the material posed to him/her."
                  },
                  {
                    "label": "Developing",
                    "points": 10,
                    "min": 6,
                    "max": 10,
                    "mode": "range",
                    "text": "The competitors’ responses reflected a broad spectrum of levels of quality from answer to answer."
                  },
                  {
                    "label": "Needs Improvement",
                    "points": 5,
                    "min": 1,
                    "max": 5,
                    "mode": "range",
                    "text": "The competitors’ responses may reflect evident effort and passion but are inconsistent in the depth, accuracy, understanding, or insight offered in responses."
                  }
                ]
              }
            ]
          },
          {
            "section": "Time of Presentation",
            "max": 5,
            "criteria": [
              {
                "name": "Length of live reading presentation",
                "description": "",
                "max": 5,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "5-10 minutes",
                    "points": 5,
                    "min": 5,
                    "max": 5,
                    "mode": "absolute",
                    "text": "Presentation is between 5 and 10 minutes."
                  },
                  {
                    "label": "4-5 minutes or 10- 11 minutes",
                    "points": 4,
                    "min": 4,
                    "max": 4,
                    "mode": "absolute",
                    "text": "Presentation is between 4 and 5 minutes or 10 and 11 minutes."
                  },
                  {
                    "label": "3-4 minutes or 11- 12 minutes",
                    "points": 3,
                    "min": 3,
                    "max": 3,
                    "mode": "absolute",
                    "text": "Presentation is between 3 and 4 minutes or 11 and 12 minutes."
                  },
                  {
                    "label": "Less than 3 minutes or over 12 minutes",
                    "points": 1,
                    "min": 1,
                    "max": 1,
                    "mode": "absolute",
                    "text": "Presentation is shorter than 3 minutes or had to be stopped at 12 minutes."
                  }
                ]
              }
            ]
          },
          {
            "section": "Overall Impact",
            "max": 20,
            "criteria": [
              {
                "name": "Overall Impact",
                "description": "Focus: Craft, polish, and near professional quality",
                "max": 20,
                "preScored": false,
                "deduction": false,
                "levels": [
                  {
                    "label": "Accomplished",
                    "points": 20,
                    "min": 16,
                    "max": 20,
                    "mode": "range",
                    "text": "The book captivates and inspires the audience. The concept, execution, and presentation are polished and reflect professionalcaliber quality in children’s literature."
                  },
                  {
                    "label": "Commendable",
                    "points": 15,
                    "min": 11,
                    "max": 15,
                    "mode": "range",
                    "text": "The book is engaging and well-crafted. The concept and presentation are strong and approach professional quality."
                  },
                  {
                    "label": "Developing",
                    "points": 10,
                    "min": 6,
                    "max": 10,
                    "mode": "range",
                    "text": "The book reflects a developing level of craftsmanship. While requirements are met, refinement and stronger execution would enhance impact."
                  },
                  {
                    "label": "Needs Improvement",
                    "points": 5,
                    "min": 1,
                    "max": 5,
                    "mode": "range",
                    "text": "The book reflects emerging skills. The concept, execution, or presentation may be incomplete or unclear, limiting overall impact."
                  }
                ]
              }
            ]
          }
        ],
        "totalPoints": 152,
        "sectionCount": 6,
        "criteriaCount": 15,
        "timeLimitSeconds": 720
      }
    },
    "scores": {
      "cy1_otherJudgeA": {
        "entryId": "cy1",
        "eventId": "evtYearbook",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeA",
        "scores": {
          "0-0": 3,
          "0-1": 3,
          "0-2": 3,
          "1-0": 3,
          "1-1": 3,
          "1-2": 3,
          "2-0": 3,
          "2-1": 3,
          "2-2": 3,
          "2-3": 3,
          "2-4": 3,
          "2-5": 3,
          "2-6": 3,
          "2-7": 3,
          "2-8": 3,
          "3-0": 4,
          "3-1": 4,
          "4-0": 4,
          "4-1": 4,
          "4-2": 3,
          "5-0": 4,
          "5-1": 4,
          "5-2": 4,
          "5-3": 4,
          "5-4": 4,
          "5-5": 4
        },
        "comments": ""
      },
      "cy1_otherJudgeB": {
        "entryId": "cy1",
        "eventId": "evtYearbook",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeB",
        "scores": {
          "0-0": 3,
          "0-1": 3,
          "0-2": 3,
          "1-0": 3,
          "1-1": 3,
          "1-2": 3,
          "2-0": 3,
          "2-1": 3,
          "2-2": 3,
          "2-3": 3,
          "2-4": 3,
          "2-5": 3,
          "2-6": 3,
          "2-7": 3,
          "2-8": 3,
          "3-0": 4,
          "3-1": 4,
          "4-0": 4,
          "4-1": 2,
          "4-2": 1,
          "5-0": 4,
          "5-1": 4,
          "5-2": 4,
          "5-3": 4,
          "5-4": 4,
          "5-5": 4
        },
        "comments": ""
      },
      "cy2_otherJudgeA": {
        "entryId": "cy2",
        "eventId": "evtYearbook",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeA",
        "scores": {
          "0-0": 3,
          "0-1": 3,
          "0-2": 3,
          "1-0": 3,
          "1-1": 3,
          "1-2": 3,
          "2-0": 3,
          "2-1": 3,
          "2-2": 3,
          "2-3": 3,
          "2-4": 3,
          "2-5": 3,
          "2-6": 3,
          "2-7": 3,
          "2-8": 3,
          "3-0": 4,
          "3-1": 4,
          "4-0": 1,
          "4-1": 1,
          "4-2": 1,
          "5-0": 4,
          "5-1": 4,
          "5-2": 4,
          "5-3": 4,
          "5-4": 1,
          "5-5": 3
        },
        "comments": ""
      },
      "cy2_otherJudgeB": {
        "entryId": "cy2",
        "eventId": "evtYearbook",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeB",
        "scores": {
          "0-0": 3,
          "0-1": 3,
          "0-2": 3,
          "1-0": 3,
          "1-1": 3,
          "1-2": 3,
          "2-0": 3,
          "2-1": 3,
          "2-2": 3,
          "2-3": 3,
          "2-4": 3,
          "2-5": 3,
          "2-6": 3,
          "2-7": 3,
          "2-8": 3,
          "3-0": 4,
          "3-1": 4,
          "4-0": 1,
          "4-1": 1,
          "4-2": 1,
          "5-0": 4,
          "5-1": 4,
          "5-2": 4,
          "5-3": 4,
          "5-4": 1,
          "5-5": 1
        },
        "comments": ""
      },
      "cy3_otherJudgeA": {
        "entryId": "cy3",
        "eventId": "evtYearbook",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeA",
        "scores": {
          "0-0": 3,
          "0-1": 3,
          "0-2": 3,
          "1-0": 3,
          "1-1": 3,
          "1-2": 3,
          "2-0": 3,
          "2-1": 3,
          "2-2": 3,
          "2-3": 3,
          "2-4": 3,
          "2-5": 3,
          "2-6": 3,
          "2-7": 3,
          "2-8": 3,
          "3-0": 5,
          "3-1": 5,
          "4-0": 5,
          "4-1": 4,
          "4-2": 1,
          "5-0": 5,
          "5-1": 5,
          "5-2": 5,
          "5-3": 5,
          "5-4": 5,
          "5-5": 5
        },
        "comments": ""
      },
      "cy3_otherJudgeB": {
        "entryId": "cy3",
        "eventId": "evtYearbook",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeB",
        "scores": {
          "0-0": 3,
          "0-1": 3,
          "0-2": 3,
          "1-0": 3,
          "1-1": 3,
          "1-2": 3,
          "2-0": 3,
          "2-1": 3,
          "2-2": 3,
          "2-3": 3,
          "2-4": 3,
          "2-5": 3,
          "2-6": 3,
          "2-7": 3,
          "2-8": 3,
          "3-0": 5,
          "3-1": 5,
          "4-0": 5,
          "4-1": 2,
          "4-2": 1,
          "5-0": 5,
          "5-1": 5,
          "5-2": 5,
          "5-3": 5,
          "5-4": 5,
          "5-5": 5
        },
        "comments": ""
      },
      "cy4_otherJudgeA": {
        "entryId": "cy4",
        "eventId": "evtYearbook",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeA",
        "scores": {
          "0-0": 3,
          "0-1": 3,
          "0-2": 3,
          "1-0": 3,
          "1-1": 3,
          "1-2": 3,
          "2-0": 3,
          "2-1": 3,
          "2-2": 3,
          "2-3": 3,
          "2-4": 3,
          "2-5": 3,
          "2-6": 3,
          "2-7": 3,
          "2-8": 3,
          "3-0": 3,
          "3-1": 3,
          "4-0": 1,
          "4-1": 1,
          "4-2": 1,
          "5-0": 1,
          "5-1": 1,
          "5-2": 1,
          "5-3": 1,
          "5-4": 1,
          "5-5": 1
        },
        "comments": ""
      },
      "cy4_otherJudgeB": {
        "entryId": "cy4",
        "eventId": "evtYearbook",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeB",
        "scores": {
          "0-0": 3,
          "0-1": 3,
          "0-2": 3,
          "1-0": 3,
          "1-1": 3,
          "1-2": 3,
          "2-0": 3,
          "2-1": 3,
          "2-2": 3,
          "2-3": 3,
          "2-4": 3,
          "2-5": 3,
          "2-6": 3,
          "2-7": 3,
          "2-8": 3,
          "3-0": 1,
          "3-1": 3,
          "4-0": 1,
          "4-1": 1,
          "4-2": 1,
          "5-0": 1,
          "5-1": 1,
          "5-2": 1,
          "5-3": 1,
          "5-4": 1,
          "5-5": 1
        },
        "comments": ""
      },
      "cy5_otherJudgeA": {
        "entryId": "cy5",
        "eventId": "evtYearbook",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeA",
        "scores": {
          "0-0": 3,
          "0-1": 3,
          "0-2": 3,
          "1-0": 3,
          "1-1": 3,
          "1-2": 3,
          "2-0": 3,
          "2-1": 3,
          "2-2": 3,
          "2-3": 3,
          "2-4": 3,
          "2-5": 3,
          "2-6": 3,
          "2-7": 3,
          "2-8": 3,
          "3-0": 4,
          "3-1": 4,
          "4-0": 3,
          "4-1": 1,
          "4-2": 1,
          "5-0": 4,
          "5-1": 4,
          "5-2": 4,
          "5-3": 4,
          "5-4": 4,
          "5-5": 4
        },
        "comments": ""
      },
      "cy5_otherJudgeB": {
        "entryId": "cy5",
        "eventId": "evtYearbook",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeB",
        "scores": {
          "0-0": 3,
          "0-1": 3,
          "0-2": 3,
          "1-0": 3,
          "1-1": 3,
          "1-2": 3,
          "2-0": 3,
          "2-1": 3,
          "2-2": 3,
          "2-3": 3,
          "2-4": 3,
          "2-5": 3,
          "2-6": 3,
          "2-7": 3,
          "2-8": 3,
          "3-0": 4,
          "3-1": 4,
          "4-0": 1,
          "4-1": 1,
          "4-2": 1,
          "5-0": 4,
          "5-1": 4,
          "5-2": 4,
          "5-3": 4,
          "5-4": 4,
          "5-5": 4
        },
        "comments": ""
      },
      "v1_otherJudgeA": {
        "entryId": "v1",
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeA",
        "scores": {
          "0-0": 17,
          "0-1": 17,
          "1-0": 5,
          "2-0": 2,
          "2-1": 2,
          "2-2": 2,
          "2-3": 2,
          "2-4": 2,
          "2-5": 2,
          "2-6": 9,
          "3-0": 17,
          "3-1": 17,
          "3-2": 17,
          "4-0": 4,
          "5-0": 15
        },
        "comments": ""
      },
      "v1_otherJudgeB": {
        "entryId": "v1",
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeB",
        "scores": {
          "0-0": 17,
          "0-1": 17,
          "1-0": 5,
          "2-0": 2,
          "2-1": 2,
          "2-2": 2,
          "2-3": 2,
          "2-4": 2,
          "2-5": 2,
          "2-6": 8,
          "3-0": 17,
          "3-1": 17,
          "3-2": 17,
          "4-0": 4,
          "5-0": 14
        },
        "comments": ""
      },
      "v2_otherJudgeA": {
        "entryId": "v2",
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeA",
        "scores": {
          "0-0": 17,
          "0-1": 17,
          "1-0": 5,
          "2-0": 2,
          "2-1": 2,
          "2-2": 2,
          "2-3": 2,
          "2-4": 2,
          "2-5": 2,
          "2-6": 9,
          "3-0": 17,
          "3-1": 17,
          "3-2": 17,
          "4-0": 4,
          "5-0": 17
        },
        "comments": ""
      },
      "v2_otherJudgeB": {
        "entryId": "v2",
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeB",
        "scores": {
          "0-0": 17,
          "0-1": 17,
          "1-0": 5,
          "2-0": 2,
          "2-1": 2,
          "2-2": 2,
          "2-3": 2,
          "2-4": 2,
          "2-5": 2,
          "2-6": 8,
          "3-0": 17,
          "3-1": 17,
          "3-2": 17,
          "4-0": 4,
          "5-0": 12
        },
        "comments": ""
      },
      "v3_otherJudgeA": {
        "entryId": "v3",
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeA",
        "scores": {
          "0-0": 19,
          "0-1": 19,
          "1-0": 5,
          "2-0": 2,
          "2-1": 2,
          "2-2": 2,
          "2-3": 2,
          "2-4": 2,
          "2-5": 2,
          "2-6": 10,
          "3-0": 19,
          "3-1": 19,
          "3-2": 19,
          "4-0": 5,
          "5-0": 18
        },
        "comments": ""
      },
      "v3_otherJudgeB": {
        "entryId": "v3",
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeB",
        "scores": {
          "0-0": 19,
          "0-1": 19,
          "1-0": 5,
          "2-0": 2,
          "2-1": 2,
          "2-2": 2,
          "2-3": 2,
          "2-4": 2,
          "2-5": 2,
          "2-6": 10,
          "3-0": 20,
          "3-1": 19,
          "3-2": 19,
          "4-0": 5,
          "5-0": 20
        },
        "comments": ""
      },
      "jv1_otherJudgeA": {
        "entryId": "jv1",
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeA",
        "scores": {
          "0-0": 14,
          "0-1": 14,
          "1-0": 3,
          "2-0": 2,
          "2-1": 2,
          "2-2": 2,
          "2-3": 2,
          "2-4": 2,
          "2-5": 2,
          "2-6": 7,
          "3-0": 14,
          "3-1": 14,
          "3-2": 14,
          "4-0": 4,
          "5-0": 12
        },
        "comments": ""
      },
      "jv1_otherJudgeB": {
        "entryId": "jv1",
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeB",
        "scores": {
          "0-0": 14,
          "0-1": 14,
          "1-0": 3,
          "2-0": 2,
          "2-1": 2,
          "2-2": 2,
          "2-3": 2,
          "2-4": 2,
          "2-5": 2,
          "2-6": 7,
          "3-0": 14,
          "3-1": 14,
          "3-2": 14,
          "4-0": 3,
          "5-0": 9
        },
        "comments": ""
      },
      "jv2_otherJudgeA": {
        "entryId": "jv2",
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeA",
        "scores": {
          "0-0": 12,
          "0-1": 12,
          "1-0": 3,
          "2-0": 2,
          "2-1": 2,
          "2-2": 2,
          "2-3": 2,
          "2-4": 2,
          "2-5": 2,
          "2-6": 6,
          "3-0": 12,
          "3-1": 12,
          "3-2": 12,
          "4-0": 3,
          "5-0": 8
        },
        "comments": ""
      },
      "jv2_otherJudgeB": {
        "entryId": "jv2",
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeB",
        "scores": {
          "0-0": 12,
          "0-1": 12,
          "1-0": 3,
          "2-0": 2,
          "2-1": 2,
          "2-2": 2,
          "2-3": 2,
          "2-4": 2,
          "2-5": 2,
          "2-6": 6,
          "3-0": 12,
          "3-1": 12,
          "3-2": 12,
          "4-0": 3,
          "5-0": 4
        },
        "comments": ""
      },
      "jv3_otherJudgeA": {
        "entryId": "jv3",
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeA",
        "scores": {
          "0-0": 18,
          "0-1": 18,
          "1-0": 5,
          "2-0": 2,
          "2-1": 2,
          "2-2": 2,
          "2-3": 2,
          "2-4": 2,
          "2-5": 2,
          "2-6": 9,
          "3-0": 18,
          "3-1": 18,
          "3-2": 18,
          "4-0": 4,
          "5-0": 16
        },
        "comments": ""
      },
      "jv3_otherJudgeB": {
        "entryId": "jv3",
        "eventId": "evtLit",
        "conferenceId": "demoConf",
        "judgeUid": "otherJudgeB",
        "scores": {
          "0-0": 17,
          "0-1": 17,
          "1-0": 5,
          "2-0": 2,
          "2-1": 2,
          "2-2": 2,
          "2-3": 2,
          "2-4": 2,
          "2-5": 2,
          "2-6": 9,
          "3-0": 17,
          "3-1": 17,
          "3-2": 17,
          "4-0": 4,
          "5-0": 17
        },
        "comments": ""
      }
    }
  },
  "listeners": [],
  "calls": [],
  "authUser": null,
  "authListeners": []
};
