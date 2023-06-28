const billValue = document.querySelector("#bill-value");

const peopleQty = document.querySelector("#people-qty");

const tipPerPerson = document.querySelector("#tip-person-value");

const totalPerPerson = document.querySelector("#total-person-value");

const tipButtons = document.querySelectorAll(".tip-option");

const customTip = document.querySelector("#custom-tip");

const resetBtn = document.querySelector("#reset-btn");

const billErrorMsg = document.querySelector("#bill-error-msg");

const peopleErrorMsg = document.querySelector("#people-error-msg");

resetBtn.disabled = true;

function calculateTotalPerPerson() {
  return `$${(billValue.value / peopleQty.value).toFixed(2)}`;
}

function calculateTipPerPerson(tipOption) {
  return `$${((tipOption * billValue.value) / peopleQty.value).toFixed(2)}`;
}

tipButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const billError = billValue.value === "" || billValue.value === 0;
    const peopleError = peopleQty.value === "" || peopleQty.value === 0;
    if (billError && peopleError) {
      showBillError();
      showPeopleError();
    } else if (billError) {
      showBillError();
    } else if (peopleError) {
      showPeopleError();
    } else {
      removeError();
      const tipValue = button.value;
      tipPerPerson.innerHTML = calculateTipPerPerson(tipValue);
      totalPerPerson.innerHTML = calculateTotalPerPerson();
      resetBtn.disabled = false;
      resetBtn.classList.remove("grayed");
    }
  });
});

customTip.onchange = () => {
  const billError = billValue.value === "" || billValue.value === 0;
  const peopleError = peopleQty.value === "" || peopleQty.value === 0;
  if (billError && peopleError) {
    showBillError();
    showPeopleError();
  } else if (billError) {
    showBillError();
  } else if (peopleError) {
    showPeopleError();
  } else {
    removeError();
    tipPerPerson.innerHTML = calculateCustomTipPerPerson(customTip.value);
    totalPerPerson.innerHTML = calculateTotalPerPerson();
    resetBtn.disabled = false;
    resetBtn.classList.remove("grayed");
  }
};

function calculateCustomTipPerPerson(value) {
  return `$${(((value / 100) * billValue.value) / peopleQty.value).toFixed(2)}`;
}

resetBtn.onclick = () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
  });
  const valuesPerPerson = document.querySelectorAll(".tip-person-value");
  valuesPerPerson.forEach((value) => {
    value.innerHTML = "$0.00";
  });
  resetBtn.disabled = true;
  resetBtn.classList.add("grayed");
};

function showBillError() {
  billErrorMsg.innerHTML = "Can't be blank or 0";
  billValue.parentElement.classList.add("error-input");
}

function showPeopleError() {
  peopleErrorMsg.innerHTML = "Can't be blank or 0";
  peopleQty.parentElement.classList.add("error-input");
}

function showCustomTipError() {
  alert("Custom tip can't be 0 or blank");
  customTip.style.border = "3px solid tomatoe";
}

function removeError() {
  peopleErrorMsg.innerHTML = "";
  billErrorMsg.innerHTML = "";
  billValue.parentElement.classList.remove("error-input");
  peopleQty.parentElement.classList.remove("error-input");
}
