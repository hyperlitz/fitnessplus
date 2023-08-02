function toggleDataInput() {
  const dataInputContainer = document.getElementById('dataInputContainer');
  const toggleDataButton = document.getElementById('toggleDataButton');
  if (dataInputContainer.style.display === 'none') {
    dataInputContainer.style.display = 'block';
    toggleDataButton.innerHTML = 'Close';
  } else {
    dataInputContainer.style.display = 'none';
    toggleDataButton.innerHTML = 'Show Data';
  }
}
  function showData() {
    const dataName = document.getElementById('dataName').value;
    const bmiData = JSON.parse(localStorage.getItem('bmiData'));
    const workoutData = JSON.parse(localStorage.getItem('workoutData'));
  
    // Check if the entered name matches any stored data in bmiData or workoutData
    let dataFound = false;

    if (bmiData && bmiData[dataName]) {
      // Display BMI data
      const bmiResultSection = document.getElementById('bmiResult');
      const successMessage = document.getElementById('success-message');
      successMessage.textContent = 'Successfully View Data!';
      successMessage.style.display = 'block';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
      bmiResultSection.style.display = 'block';
      bmiResultSection.style.textAlign = 'center';
    
      // Get the latest BMI data for the entered name (the last entry)
      const latestBMI = bmiData[dataName][bmiData[dataName].length - 1];
    
      // Display the BMI value and category
      document.getElementById('bmiValue').textContent = latestBMI.result.bmi.toFixed(2);
      document.getElementById('bmiCategory').textContent = latestBMI.bmiCategory;
    
      dataFound = true;
    } else {
      // Hide BMI data if name does not match
      const bmiResultSection = document.getElementById('bmiResult');
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'No BMI Data Found!';
      errorMessage.style.display = 'block';
      setTimeout(() => {
        errorMessage.style.display = 'none';
      }, 3000);
      bmiResultSection.style.display = 'none';
    }
      
  
    if (workoutData && workoutData[dataName]) {
      // Display workout data
      const workoutResultSection = document.getElementById('workoutResult');
      workoutResultSection.style.display = 'block';
      const successMessage = document.getElementById('success-message');
      successMessage.textContent = 'Successfully View Data!';
      successMessage.style.display = 'block';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
  
      const warmUpData = workoutData[dataName]['data']['Warm Up'];
      const exercisesData = workoutData[dataName]['data']['Exercises'];
      const coolDownData = workoutData[dataName]['data']['Cool Down'];
  
      const warmUpTable = document.getElementById('warmUpTable');
      warmUpTable.innerHTML = `
    <tr>
      <th>Exercise</th>
      <th>Time</th>
    </tr>
    ${warmUpData && warmUpData.length
      ? warmUpData
          .map(
            (item) => `
              <tr>
                <td>${item.Exercise}</td>
                <td>${item.Time}</td>
              </tr>
            `
          )
          .join('')
      : '<tr><td colspan="2">No warm-up data available.</td></tr>'
    }
  `;

  const exercisesTable = document.getElementById('exercisesTable');
  exercisesTable.innerHTML = `
    <tr>
      <th>Exercise Per Sets</th>
      <th>Sets</th>
      <th>Reps</th>
    </tr>
    ${exercisesData && exercisesData.length
      ? exercisesData
          .map(
            (item) => `
              <tr>
                <td>${item.Exercise}</td>
                <td>${item.Sets}</td>
                <td>${item.Reps}</td>
              </tr>
            `
          )
          .join('')
      : '<tr><td colspan="3">No exercises data available.</td></tr>'
    }
  `;

  const coolDownTable = document.getElementById('coolDownTable');
  coolDownTable.innerHTML = `
    <tr>
      <th>Exercise</th>
      <th>Time</th>
    </tr>
    ${coolDownData && coolDownData.length
      ? coolDownData
          .map(
            (item) => `
              <tr>
                <td>${item.Exercise}</td>
                <td>${item.Time}</td>
              </tr>
            `
          )
          .join('')
      : '<tr><td colspan="2">No cool-down data available.</td></tr>'
    }
  `;

  dataFound = true;
  } else {
      // Hide workout data if name does not match
      const workoutResultSection = document.getElementById('workoutResult');
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'No Workout Data Found!';
      errorMessage.style.display = 'block';
      setTimeout(() => {
        errorMessage.style.display = 'none';
      }, 3000);
      workoutResultSection.style.display = 'none';
    }
  
    if (!dataFound) {
      // Display an error message if no data found for the entered name
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'No Data Found!';
      errorMessage.style.display = 'block';
      setTimeout(() => {
        errorMessage.style.display = 'none';
      }, 3000);
    }
  }
  
  // Function to validate required inputs
function validateRequiredInputs() {
  const requiredInputs = document.querySelectorAll('.required');
  let isValid = true;

  requiredInputs.forEach(input => {
    if (input.value.trim() === '') {
      input.classList.add('input-error');
      isValid = false;
    } else {
      input.classList.remove('input-error');
    }
  });

  return isValid;
}

// Fitness Workout Planner
document.getElementById('workoutForm').addEventListener('submit', async function (event) {
event.preventDefault();
const successMessage = document.getElementById('success-message');
const name = document.getElementById('workoutForm').elements['name'].value;
successMessage.textContent = 'Work-Out Planner Successfully Get.';
successMessage.style.display = 'none'; // Hide the message by default

if (!validateRequiredInputs()) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = 'Please fill in all required fields.';
  errorMessage.style.display = 'block';
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 3000);
  return;
}

const loader = document.getElementById('loader');
const res = document.getElementById('success-message');
const ress = document.getElementById('res');
loader.style.display = 'block';

const time = document.getElementById('time').value;
const muscle = document.getElementById('muscle').value;
const location = document.getElementById('location').value;
const equipment = document.getElementById('equipment').value;

const url = `https://workout-planner1.p.rapidapi.com/?time=${time}&muscle=${muscle}&location=${location}&equipment=${equipment}`  ;
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
  res.textContent = 'Workout Planned Successfully.';
  res.style.display = 'block';
  ress.style.display = 'block';
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
    
  let workoutData = JSON.parse(localStorage.getItem('workoutData')) || {};

if (workoutData[name]) {
  // Append to existing workout data
  workoutData[name].data = data;
} else {
  // Create new workout data
  workoutData[name] = {
    name: name,
    data: data,
  };
}

const workoutResultSection = document.getElementById('workoutResult');
workoutResultSection.style.display = 'block';
// Save the updated workout data to local storage
localStorage.setItem('workoutData', JSON.stringify(workoutData));

  // Hide the success message after 3 seconds
  setTimeout(() => {
    res.style.display = 'none';
  }, 3000);
} catch (error) {
  console.error(error);

  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = 'An error occurred while fetching data. Please try again later.';
  errorMessage.style.display = 'block';
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 3000);

  loader.style.display = 'none';
}
});

// BMI Calculator
document.getElementById('calculate').addEventListener('click', calculateBMI);

async function calculateBMI() {
const name = document.getElementById('bmiForm').elements['name'].value;
if (!validateRequiredInputs()) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = 'Please fill in all required fields.';
  errorMessage.style.display = 'block';
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 3000);
  return;
}

const loader = document.getElementById('loader');
const res = document.getElementById('success-message');
const ress = document.getElementById('res');
loader.style.display = 'block';

const age = parseInt(document.getElementById('age').value);
const gender = document.getElementById('gender').value;
const weight = parseFloat(document.getElementById('weight').value);
const height = parseFloat(document.getElementById('height').value);

if (isNaN(age) || age < 1) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = 'Please enter a valid age.';
  errorMessage.style.display = 'block';
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 3000);
  loader.style.display = 'none';
  return;
}

if (gender === '') {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = 'Please select a valid gender.';
  errorMessage.style.display = 'block';
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 3000);
  loader.style.display = 'none';
  return;
}

if (isNaN(weight) || isNaN(height) || weight < 1 || height < 0.01) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = 'Please enter valid weight and height values.';
  errorMessage.style.display = 'block';
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 3000);
  loader.style.display = 'none';
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
  res.style.display = 'block';
  ress.style.display = 'block';
  displayBMIResult(result, name);
  loader.style.display = 'none';
} catch (error) {
  console.error(error);

  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = 'An error occurred while fetching BMI data. Please try again later.';
  errorMessage.style.display = 'block';
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 3000);

  loader.style.display = 'none';
}
}

function displayBMIResult(result, name) {
  const bmiValue = result.bmi.toFixed(2);

  const bmiResultSection = document.getElementById('bmiResult');
  const bmiValueElement = document.getElementById('bmiValue');
  const bmiCategoryElement = document.getElementById('bmiCategory');

  bmiValueElement.textContent = bmiValue;
  bmiResultSection.style.display = 'block';
  bmiResultSection.style.textAlign = 'center';

  // Define BMI categories and their ranges
  const categories = {
    UNDERWEIGHT: { min: 0, max: 18.4 },
    NORMAL: { min: 18.5, max: 24.9 },
    OVERWEIGHT: { min: 25, max: 29.9 },
    OBESE: { min: 30, max: Infinity },
  };

  // Find the category based on the BMI value
  let bmiCategory = 'Unknown';
  for (const [categoryName, range] of Object.entries(categories)) {
    if (result.bmi >= range.min && result.bmi <= range.max) {
      bmiCategory = categoryName;
      break;
    }
  }

  // Set the BMI category in the result object
  result.weightCategory = bmiCategory;

  let bmiData = JSON.parse(localStorage.getItem('bmiData')) || {};

  // Create new BMI data if it doesn't exist for the entered name
  if (!bmiData[name]) {
    bmiData[name] = [];
  }

  const newEntry = {
    result: result,
    bmiCategory: bmiCategory,
    name: name,
  };

  // Add the new entry to the existing BMI data
  bmiData[name].push(newEntry);

  // Save the updated BMI data to local storage
  localStorage.setItem('bmiData', JSON.stringify(bmiData));

  bmiCategoryElement.textContent = bmiCategory;

  // Show the success message for 3 seconds
  const successMessage = document.getElementById('success-message');
  successMessage.textContent = 'BMI Calculated Successfully.';
  successMessage.style.display = 'block';
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 3000);
}