// Select all student rows and listen for score changes.
    const studentRows = document.querySelectorAll("#studentRows tr");
    const message = document.querySelector("#message");

    function getGrade(total) {
      if (total >= 70) {
        return "A";
      } else if (total >= 60) {
        return "B";
      } else if (total >= 50) {
        return "C";
      } else if (total >= 45) {
        return "D";
      } else if (total >= 40) {
        return "E";
      } else {
        return "F";
      }
    }

    function calculateStudentResult(row) {
      const scoreInputs = row.querySelectorAll(".score");
      const totalCell = row.querySelector(".total");
      const gradeCell = row.querySelector(".grade");

      let total = 0;
      let allFieldsFilled = true;
      let hasInvalidScore = false;

      scoreInputs.forEach((input) => {
        const rawValue = input.value;

        if (rawValue === "") {
          allFieldsFilled = false;
          return;
        }

        const score = Number(rawValue);

        if (!Number.isFinite(score) || score < 0 || score > 100) {
          hasInvalidScore = true;
        } else {
          total += score;
        }
      });

      if (hasInvalidScore) {
        totalCell.textContent = "Invalid";
        gradeCell.textContent = "—";
        message.textContent = "Each score must be a number from 0 to 100.";
      } else if (!allFieldsFilled) {
        totalCell.textContent = "—";
        gradeCell.textContent = "—";
        message.textContent = "";
      } else {
        totalCell.textContent = total;
        gradeCell.textContent = getGrade(total);
        message.textContent = "";
      }
    }

    // input event runs whenever the user changes a score.
    studentRows.forEach((row) => {
      row.querySelectorAll(".score").forEach((input) => {
        input.addEventListener("input", () => calculateStudentResult(row));
      });
    });

    document.querySelector("#clearButton").addEventListener("click", () => {
      studentRows.forEach((row) => {
        row.querySelectorAll(".score").forEach((input) => input.value = "");
        row.querySelector(".total").textContent = "—";
        row.querySelector(".grade").textContent = "—";
      });
      message.textContent = "All scores have been cleared.";
    });

    document.querySelector("#printButton").addEventListener("click", () => {
      window.print();
    });