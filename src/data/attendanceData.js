const attendanceDB = {
  // ================= DIPLOMA =================
  DiplomaA: {
    dayWise: [
      { day: "Mon", present: 30, absent: 5 },
      { day: "Tue", present: 28, absent: 7 },
      { day: "Wed", present: 29, absent: 6 },
      { day: "Thu", present: 27, absent: 8 },
      { day: "Fri", present: 31, absent: 4 },
    ],
    monthWise: [
      { month: "Jan", present: 550, absent: 50 },
      { month: "Feb", present: 520, absent: 80 },
      { month: "Mar", present: 560, absent: 40 }
    ],
    yearWise: [
      { year: "2024", present: 6000, absent: 400 },
      { year: "2025", present: 5800, absent: 500 },
    ]
  },

  DiplomaB: {
    dayWise: [
      { day: "Mon", present: 33, absent: 3 },
      { day: "Tue", present: 32, absent: 4 },
      { day: "Wed", present: 30, absent: 6 },
    ],
    monthWise: [
      { month: "Jan", present: 580, absent: 30 },
      { month: "Feb", present: 540, absent: 60 }
    ],
    yearWise: [
      { year: "2024", present: 6200, absent: 350 },
      { year: "2025", present: 6000, absent: 380 },
    ]
  },

  // ================= BTech BE =================
  BTechBEA: {
    dayWise: [
      { day: "Mon", present: 40, absent: 2 },
      { day: "Tue", present: 38, absent: 4 },
      { day: "Wed", present: 39, absent: 3 },
    ],
    monthWise: [
      { month: "Jan", present: 700, absent: 20 },
      { month: "Feb", present: 680, absent: 30 },
    ],
    yearWise: [
      { year: "2024", present: 7600, absent: 200 },
      { year: "2025", present: 7400, absent: 250 },
    ]
  },

  BTechBEB: {
    dayWise: [
      { day: "Mon", present: 37, absent: 5 },
      { day: "Tue", present: 36, absent: 6 },
      { day: "Wed", present: 38, absent: 4 },
    ],
    monthWise: [
      { month: "Jan", present: 690, absent: 30 },
      { month: "Feb", present: 650, absent: 50 },
    ],
    yearWise: [
      { year: "2024", present: 7500, absent: 300 },
      { year: "2025", present: 7200, absent: 320 },
    ]
  },

  // ================= MTech =================
  MTechA: {
    dayWise: [
      { day: "Mon", present: 20, absent: 1 },
      { day: "Tue", present: 19, absent: 2 },
      { day: "Wed", present: 18, absent: 3 },
    ],
    monthWise: [
      { month: "Jan", present: 350, absent: 10 },
      { month: "Feb", present: 340, absent: 20 },
    ],
    yearWise: [
      { year: "2024", present: 3800, absent: 100 },
      { year: "2025", present: 3700, absent: 150 },
    ]
  },

  MTechB: {
    dayWise: [
      { day: "Mon", present: 22, absent: 2 },
      { day: "Tue", present: 21, absent: 3 },
      { day: "Wed", present: 23, absent: 1 },
    ],
    monthWise: [
      { month: "Jan", present: 360, absent: 5 },
      { month: "Feb", present: 355, absent: 15 },
    ],
    yearWise: [
      { year: "2024", present: 3900, absent: 80 },
      { year: "2025", present: 3800, absent: 120 },
    ]
  },
};

export default attendanceDB;

