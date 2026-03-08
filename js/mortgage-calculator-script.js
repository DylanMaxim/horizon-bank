const houseValue = document.getElementById("house-value");
const downPayment = document.getElementById("down-payment");
const loanAmount = document.getElementById("loan-amount");
const annualInterestRate = 0.045
const annualInterestCalc = 1.045
const loanDuration = document.getElementById("loan-duration");
const annualIncome = document.getElementById("yearly-income");

const form = document.getElementById("mortgage-form");

downPayment.addEventListener("keyup", ()=> {
    loanAmount.value=houseValue.value - downPayment.value; 

    let loanAmountValue = loanAmount.value;
    return loanAmountValue;
});

function calculateMortgage (loanAmount,annualInterestRate,numberYearlyPayments){

    let mortgage = (loanAmount * (annualInterestRate/12) * ((1 + (annualInterestRate/12)) ** (numberYearlyPayments*12))) / ((((1+(annualInterestRate/12)) ** (numberYearlyPayments*12))) - 1)

    return parseFloat(mortgage.toFixed(2));
}

function eligibilityChecker (loanAmount,annualIncome){
    let monthlyIncome = annualIncome / 12;
    let threshold = monthlyIncome * 0.3;
    if (
        loanAmount >= threshold
    ) {
        return false
    } else {
        return true
    }
}

// Total payment = loanamount*0.045^years
// Total interest =  payment - loanamount
// remaining income after expenses = monthlyincome-monthlypayment

form.onsubmit=(e)=>{
    e.preventDefault();
    validate();
    let loanAmountValue = houseValue.value - downPayment.value;
    let yearlyLoanDuration = loanDuration.value;

    let monthlyPayment = calculateMortgage(loanAmountValue,annualInterestRate,yearlyLoanDuration)

    let eligibilityBool = eligibilityChecker(monthlyPayment,annualIncome.value)

    let totalRepayment = loanAmountValue * (annualInterestCalc ** loanDuration.value)
    let totalInterestPaid = totalRepayment - loanAmountValue
    let remainingMonthlyIncome = (annualIncome.value/12) - monthlyPayment
     let remainingYearlyIncome = annualIncome.value - (monthlyPayment*12)

    document.getElementById("monthly-payment").innerHTML= `£${monthlyPayment}`;

    if (eligibilityBool===true) {
        document.getElementById("eligibility").innerHTML= `Loan Approved`;
        document.getElementById("total-repayment").innerHTML= `£${parseFloat(totalRepayment.toFixed(2))}`;
        document.getElementById("total-interest").innerHTML= `£${parseFloat(totalInterestPaid.toFixed(2))}`;
        document.getElementById("remaining-yearly-income").innerHTML= `£${parseFloat(remainingMonthlyIncome.toFixed(2))}`;
        document.getElementById("remaining-monthly-income").innerHTML= `£${parseFloat(remainingYearlyIncome.toFixed(2))}`;
    } else {
        document.getElementById("eligibility").innerHTML= `Loan Denied: Monthly Payment exceeds 30% of your Monthly Income`;
        document.getElementById("total-repayment").innerHTML= ``;
        document.getElementById("total-interest").innerHTML= ``;
        document.getElementById("remaining-yearly-income").innerHTML= ``;
        document.getElementById("remaining-monthly-income").innerHTML= ``;
    }    
};

function validate() {
    if(
        houseValue.value === "" || downPayment.value === "" || loanDuration.value === "" || annualIncome.value === ""
    ) {
        let alert = document.createElement("div")
        alert.className = ("alert-btn");
        alert.innerHTML = `<span>Please Complete All Fields</span>`;
        alert.style.margin = "0.5rem 35%";
        form.parentNode.insertBefore(alert,form);
        setTimeout(() => alert.remove(), "3000")
    }
}
