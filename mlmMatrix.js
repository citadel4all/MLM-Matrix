class Investor {
    constructor(name, amountInvested, investmentDate) {
        this.name = name;
        this.amountInvested = amountInvested; // Amount invested in Naira
        this.investmentDate = new Date(investmentDate); // Investment start date
        this.dividendRate = 0.20; // 20% dividend
        this.biWeeklyPaymentDays = 14; // Biweekly payments
        this.downlines = []; // Array to store downline investors
        this.referralBenefits = 0;
    }

    // Method to calculate the dividend based on the amount invested
    calculateDividend() {
        return this.amountInvested * this.dividendRate;
    }

    // Method to calculate the next payment date (bi-weekly)
    getNextPaymentDate() {
        const currentDate = new Date();
        let nextPaymentDate = new Date(this.investmentDate.getTime());
        while (nextPaymentDate <= currentDate) {
            nextPaymentDate.setDate(nextPaymentDate.getDate() + this.biWeeklyPaymentDays);
        }
        return nextPaymentDate;
    }

    // Method to add downline investors
    addDownline(investor) {
        this.downlines.push(investor);
        this.updateReferralBenefits();
    }

    // Method to calculate referral benefits (20% of each downline's dividend)
    updateReferralBenefits() {
        this.referralBenefits = this.downlines.reduce((total, downline) => {
            return total + downline.calculateDividend() * 0.20; // 20% of downline's dividends
        }, 0);
    }

    // Method to display investor details
    displayInfo() {
        console.log(`Investor: ${this.name}`);
        console.log(`Amount Invested: ₦${this.amountInvested}`);
        console.log(`Investment Date: ${this.investmentDate.toLocaleDateString()}`);
        console.log(`Next Payment Date: ${this.getNextPaymentDate().toLocaleDateString()}`);
        console.log(`Dividends (Bi-weekly): ₦${this.calculateDividend()}`);
        console.log(`Referral Benefits: ₦${this.referralBenefits}`);
        console.log('--- Downlines ---');
        this.downlines.forEach((downline, index) => {
            console.log(`${index + 1}. ${downline.name} | Dividend: ₦${downline.calculateDividend()}`);
        });
    }
}

// Create a new investor
const investor1 = new Investor("John Doe", 1000, "2024-09-01");
const investor2 = new Investor("Jane Smith", 500, "2024-09-10");
const investor3 = new Investor("Mike Johnson", 700, "2024-09-05");

// Add referrals (downlines)
investor1.addDownline(investor2);
investor1.addDownline(investor3);

// Display information for Investor 1
investor1.displayInfo();