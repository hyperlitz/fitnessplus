    const loader = document.getElementById('loader');
    const res = document.getElementById('res');
    // Fitness Workout Planner
    document.getElementById('workoutForm').addEventListener('submit', async function (event) {
      event.preventDefault();

      loader.style.display = 'block';
      const time = document.getElementById('time').value;
      const muscle = document.getElementById('muscle').value;
      const location = document.getElementById('location').value;
      const equipment = document.getElementById('equipment').value;

      const url = `https://workout-planner1.p.rapidapi.com/?time=${time}&muscle=${muscle}&location=${location}&equipment=${equipment}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'fff2f9c442msha7d88f7ff4354cbp17c8b7jsn598c2d7957dc',
          'X-RapidAPI-Host': 'workout-planner1.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        res.style.display = 'block'
        loader.style.display = 'none';

        const warmUpTable = document.getElementById('warmUpTable');
        warmUpTable.innerHTML = `
          <tr>
            <th>Exercise</th>
            <th>Time</th>
          </tr>
          ${data['Warm Up'].map(item => `
            <tr>
              <td>${item.Exercise}</td>
              <td>${item.Time}</td>
            </tr>
          `).join('')}
        `;

        const exercisesTable = document.getElementById('exercisesTable');
        exercisesTable.innerHTML = `
          <tr>
            <th>Exercise Per Sets</th>
            <th>Sets</th>
            <th>Reps</th>
          </tr>
          ${data.Exercises.map(item => `
            <tr>
              <td>${item.Exercise}</td>
              <td>${item.Sets}</td>
              <td>${item.Reps}</td>
            </tr>
          `).join('')}
        `;

        const coolDownTable = document.getElementById('coolDownTable');
        coolDownTable.innerHTML = `
          <tr>
            <th>Pre-Exercise</th>
            <th>Time</th>
          </tr>
          ${data['Cool Down'].map(item => `
            <tr>
              <td>${item.Exercise}</td>
              <td>${item.Time}</td>
            </tr>
          `).join('')}
        `;

        const workoutResultSection = document.getElementById('workoutResult');
        workoutResultSection.style.display = 'block';
      } catch (error) {
        console.error(error);
        loader.style.display = 'none';
      }
    });

    // BMI Calculator
    document.getElementById('calculate').addEventListener('click', calculateBMI);

    async function calculateBMI() {
      const age = parseInt(document.getElementById('age').value);
      const gender = document.getElementById('gender').value;
      const weight = parseFloat(document.getElementById('weight').value);
      const height = parseFloat(document.getElementById('height').value);

      if (isNaN(age) || age < 1) {
        alert('Please enter a valid age.');
        return;
      }

      if (gender === '') {
        alert('Please select a valid gender.');
        return;
      }

      if (isNaN(weight) || isNaN(height) || weight < 1 || height < 0.01) {
        alert('Please enter valid weight and height values.');
        return;
      }

      const url = `https://body-mass-index-bmi-calculator.p.rapidapi.com/metric?weight=${weight}&height=${height}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'fff2f9c442msha7d88f7ff4354cbp17c8b7jsn598c2d7957dc',
          'X-RapidAPI-Host': 'body-mass-index-bmi-calculator.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        res.style.display = 'block'
        displayBMIResult(result);
        loader.style.display = 'none'; 
      } catch (error) {
        console.error(error);
        alert('An error occurred while fetching data. Please try again later.');
        loader.style.display = 'none';
      }
    }

    function displayBMIResult(result) {
      const bmiValue = result.bmi.toFixed(2);
      const category = result.health;

      const bmiResultSection = document.getElementById('bmiResult');
      const bmiValueElement = document.getElementById('bmiValue');
      const bmiCategoryElement = document.getElementById('bmiCategory');

      bmiValueElement.textContent = bmiValue;
      bmiResultSection.style.display = 'block';
      bmiResultSection.style.textAlign = 'center';
    }