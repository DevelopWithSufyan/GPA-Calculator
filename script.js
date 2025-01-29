const gradeMapping = [
    { min: 91, max: 100, gpa: 4.00 },
    { min: 80, max: 90, gpa: 3.66 },
    { min: 75, max: 79, gpa: 3.33 },
    { min: 71, max: 74, gpa: 3.00 },
    { min: 68, max: 70, gpa: 2.66 },
    { min: 64, max: 67, gpa: 2.33 },
    { min: 61, max: 63, gpa: 2.00 },
    { min: 58, max: 60, gpa: 1.66 },
    { min: 54, max: 57, gpa: 1.33 },
    { min: 50, max: 53, gpa: 1.00 },
    { min: 0, max: 49, gpa: 0.00 }
];

const theoryTable = document.getElementById("theoryTable");
const labTable = document.getElementById("labTable");
const addTheory = document.getElementById("addTheory");
const addLab = document.getElementById("addLab");
const calculate = document.getElementById("calculate");
const modalBody = document.getElementById("modalBody");

addTheory.addEventListener("click", () => {
    const row = theoryTable.insertRow();
    row.innerHTML = `
        <td><input type="text" placeholder="Course Name"></td>
        <td>3</td>
        <td><input type="number" class="theory-marks" min="0" max="100" placeholder="Marks"></td>
        <td><button class="btn btn-danger btn-sm" onclick="this.closest('tr').remove()">Delete</button></td>
    `;
    validateInputs();
});

addLab.addEventListener("click", () => {
    const row = labTable.insertRow();
    row.innerHTML = `
        <td><input type="text" placeholder="Lab Name"></td>
        <td>1</td>
        <td><input type="number" class="lab-marks" min="0" max="50" placeholder="Marks"></td>
        <td><button class="btn btn-danger btn-sm" onclick="this.closest('tr').remove()">Delete</button></td>
    `;
    validateInputs();
});

calculate.addEventListener("click", () => {
    let totalGPA = 0;
    let totalCredits = 0;
    let resultHTML = "<h5>Results:</h5><ul>";

    // Calculate Theory GPA
    for (let i = 1; i < theoryTable.rows.length; i++) {
        const marks = parseFloat(theoryTable.rows[i].cells[2].querySelector("input").value);
        if (!isNaN(marks)) {
            const gpa = getGPA(marks);
            resultHTML += `<li>Theory Course ${i}: GPA = ${gpa.toFixed(2)}</li>`;
            totalGPA += gpa * 3;
            totalCredits += 3;
        }
    }

    // Calculate Lab GPA
    for (let i = 1; i < labTable.rows.length; i++) {
        const marks = parseFloat(labTable.rows[i].cells[2].querySelector("input").value);
        if (!isNaN(marks)) {
            const scaledMarks = (marks / 50) * 100;
            const gpa = getGPA(scaledMarks);
            resultHTML += `<li>Lab ${i}: GPA = ${gpa.toFixed(2)}</li>`;
            totalGPA += gpa * 1;
            totalCredits += 1;
        }
    }

    const finalGPA = totalGPA / totalCredits;
    if(finalGPA > 0.1){
        resultHTML += `</ul><h5>Total GPA: ${finalGPA.toFixed(2)}</h5>`;
    }
    else {
        resultHTML += `</ul><h5 style="color: red; font-style: italic; font-family: Georgia, 'Times New Roman', Times, serif;" >Total GPA: Insert Marks Properly!</h5>`;
    }

    modalBody.innerHTML = resultHTML;
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
});

function getGPA(marks) {
    for (const range of gradeMapping) {
        if (marks >= range.min && marks <= range.max) {
            return range.gpa;
        }
    }
    return 0;
}

// Function to Validate Inputs (Restricts Values)
function validateInputs() {
    document.querySelectorAll(".theory-marks").forEach(input => {
        input.addEventListener("input", function () {
            if (this.value < 0) this.value = 0;
            if (this.value > 100) this.value = 100;
        });
    });

    document.querySelectorAll(".lab-marks").forEach(input => {
        input.addEventListener("input", function () {
            if (this.value < 0) this.value = 0;
            if (this.value > 50) this.value = 50;
        });
    });
}
validateInputs();
