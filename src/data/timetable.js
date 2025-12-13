export const timetableData = {

  /* =========================================================
     BTECH / BE – CSE
  ========================================================= */

  "BTech / BE-CSE-Batch 2024": fullCSE("Batch 2024"),
  "BTech / BE-CSE-Batch 2025": fullCSE("Batch 2025"),
  "BTech / BE-CSE-Morning Batch": fullCSE("Morning Batch"),
  "BTech / BE-CSE-Evening Batch": fullCSE("Evening Batch"),

  /* =========================================================
     BTECH / BE – ME
  ========================================================= */

  "BTech / BE-ME-Batch 2024": fullME("Batch 2024"),
  "BTech / BE-ME-Batch 2025": fullME("Batch 2025"),
  "BTech / BE-ME-Morning Batch": fullME("Morning Batch"),
  "BTech / BE-ME-Evening Batch": fullME("Evening Batch"),

  /* =========================================================
     DIPLOMA – CSE
  ========================================================= */

  "Diploma-CSE-Batch 2024": fullDiplomaCSE("Batch 2024"),
  "Diploma-CSE-Batch 2025": fullDiplomaCSE("Batch 2025"),
  "Diploma-CSE-Morning Batch": fullDiplomaCSE("Morning Batch"),
  "Diploma-CSE-Evening Batch": fullDiplomaCSE("Evening Batch"),

  /* =========================================================
     DIPLOMA – CE
  ========================================================= */

  "Diploma-CE-Batch 2024": fullDiplomaCE("Batch 2024"),
  "Diploma-CE-Batch 2025": fullDiplomaCE("Batch 2025"),
  "Diploma-CE-Morning Batch": fullDiplomaCE("Morning Batch"),
  "Diploma-CE-Evening Batch": fullDiplomaCE("Evening Batch"),

  /* =========================================================
     MTECH – CSE
  ========================================================= */

  "MTech-CSE-Batch 2024": fullMTechCSE("Batch 2024"),
  "MTech-CSE-Evening Batch": fullMTechCSE("Evening Batch"),
};


/* =========================================================
   COMMON FULL-DAY GENERATORS (8 AM – 4 PM)
========================================================= */

function fullCSE(batch) {
  return [
    slot("08:00 AM","Maths","Physics","Programming","Maths","Lab","PT"),
    slot("08:40 AM","DSA","Maths","DBMS","OS","Programming","Library"),
    slot("09:20 AM","DBMS","DSA","Maths","DBMS","Lab","Sports"),
    slot("10:20 AM","OS","OS","CN","OS","Tutorial","Seminar"),
    slot("11:00 AM","CN","Maths","OS","CN","Mini Project","Club"),
    slot("11:40 AM","Maths","DBMS","CN","Maths","Lab","PT"),
    slot("01:00 PM","SE","AI","CN","SE","Mini Project","Seminar"),
    slot("01:40 PM","AI","SE","AI","AI","Lab","Club"),
    slot("02:20 PM","Elective","Elective","Elective","Elective","Tutorial","Sports"),
    slot("03:00 PM","Project","Project","Project","Project","Review","PT"),
  ];
}

function fullME(batch) {
  return [
    slot("08:00 AM","Mechanics","Thermo","Maths","Mechanics","Workshop","PT"),
    slot("08:40 AM","SOM","Maths","SOM","SOM","Lab","Library"),
    slot("09:20 AM","Thermo","FM","Maths","Thermo","Tutorial","Sports"),
    slot("10:20 AM","FM","FM","FM","FM","Lab","Seminar"),
    slot("11:00 AM","Manufacturing","Manufacturing","Manufacturing","Manufacturing","Workshop","Club"),
    slot("11:40 AM","Maths","SOM","Maths","SOM","Tutorial","PT"),
    slot("01:00 PM","CAD","CAD","CAD","CAD","Lab","Seminar"),
    slot("01:40 PM","Heat Transfer","Heat Transfer","Heat Transfer","Heat Transfer","Lab","Club"),
    slot("02:20 PM","Elective","Elective","Elective","Elective","Tutorial","Sports"),
    slot("03:00 PM","Project","Project","Project","Project","Review","PT"),
  ];
}

function fullDiplomaCSE(batch) {
  return [
    slot("08:00 AM","Programming","DBMS","Maths","Programming","Lab","PT"),
    slot("08:40 AM","Maths","Programming","DBMS","Maths","Workshop","Library"),
    slot("09:20 AM","Web Tech","Maths","Programming","Web Tech","Lab","Sports"),
    slot("10:20 AM","DBMS","DBMS","DBMS","DBMS","Tutorial","Seminar"),
    slot("11:00 AM","OS","OS","OS","OS","Mini Project","Club"),
    slot("11:40 AM","Maths","DBMS","Maths","DBMS","Tutorial","PT"),
    slot("01:00 PM","Web Lab","Web Lab","Web Lab","Web Lab","Lab","Seminar"),
    slot("01:40 PM","Elective","Elective","Elective","Elective","Lab","Club"),
    slot("02:20 PM","Project","Project","Project","Project","Review","Sports"),
    slot("03:00 PM","Seminar","Seminar","Seminar","Seminar","PT","PT"),
  ];
}

function fullDiplomaCE(batch) {
  return [
    slot("08:00 AM","Drawing","Survey","Maths","Structures","Lab","PT"),
    slot("08:40 AM","Maths","Drawing","Survey","Maths","Workshop","Library"),
    slot("09:20 AM","Structures","Maths","Drawing","Structures","Tutorial","Sports"),
    slot("10:20 AM","Survey","Survey","Survey","Survey","Lab","Seminar"),
    slot("11:00 AM","Construction","Construction","Construction","Construction","Workshop","Club"),
    slot("11:40 AM","Maths","Structures","Maths","Structures","Tutorial","PT"),
    slot("01:00 PM","AutoCAD","AutoCAD","AutoCAD","AutoCAD","Lab","Seminar"),
    slot("01:40 PM","Materials","Materials","Materials","Materials","Lab","Club"),
    slot("02:20 PM","Elective","Elective","Elective","Elective","Tutorial","Sports"),
    slot("03:00 PM","Site Practice","Site Practice","Site Practice","Site Practice","Review","PT"),
  ];
}

function fullMTechCSE(batch) {
  return [
    slot("08:00 AM","Adv Maths","ML","AI","Adv Maths","Research","-"),
    slot("08:40 AM","ML","AI","ML","ML","Research","-"),
    slot("09:20 AM","Data Mining","Big Data","DM","DM","Lab","-"),
    slot("10:20 AM","AI","AI","AI","AI","Seminar","-"),
    slot("11:00 AM","Cloud","Cloud","Cloud","Cloud","Project","-"),
    slot("11:40 AM","Blockchain","Blockchain","Blockchain","Blockchain","Research","-"),
    slot("01:00 PM","Thesis","Thesis","Thesis","Thesis","Guide Meet","-"),
    slot("01:40 PM","Elective","Elective","Elective","Elective","Seminar","-"),
    slot("02:20 PM","Project","Project","Project","Project","Review","-"),
    slot("03:00 PM","Research","Research","Research","Research","Review","-"),
  ];
}

/* Helper */
function slot(start, Mon, Tue, Wed, Thu, Fri, Sat) {
  return {
    start,
    Monday: Mon,
    Tuesday: Tue,
    Wednesday: Wed,
    Thursday: Thu,
    Friday: Fri,
    Saturday: Sat,
  };
}

