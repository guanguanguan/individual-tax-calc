const alg = {
	calc(salary, insurance, fund, deduction) {
		if (salary <= taxBase) {
			return undefined;
		}
		var data = [];
		var paid = decimal(0);
		for (let i = 1; i <= monthOfYear; i++) {
			let taxTotal = decimal(salary).mul(i)
				.sub(decimal(insurance).mul(i))
				.sub(decimal(fund).mul(i))
				.sub(decimal(deduction).mul(i))
				.sub(decimal(5000).mul(i));
			let rate = taxRange.contains(taxTotal);
			let precent = decimal(rate.rate).div(100);
			let tax = decimal(taxTotal).mul(precent).sub(rate.number);
			let realTax = tax.sub(paid.toNumber())
			if (i + 1 <= monthOfYear) {
				paid = paid.add(realTax)
			}
			let realSalary = decimal(salary).sub(insurance).sub(fund).sub(realTax)
			data.push({
				'month': i,
				'salary': salary,
				'insurance': decimal(insurance).add(fund).toNumber(),
				'deduction': deduction,
				'base': taxBase,
				'taxTotal': taxTotal.toNumber(),
				'rate': rate.rate,
				'number': rate.number,
				'tax': tax.toNumber(),
				'paid': paid.toNumber(),
				'realTax': realTax.toNumber(),
				'realSalary': realSalary.toNumber(),
			});
		}
		return data;
	}
};

const decimal = require('decimal');

const monthOfYear = 12;

const taxBase = 5000;

const taxRange = {
	range: [{
		low: 0,
		high: 36000,
		rate: 3,
		number: 0
	}, {
		low: 36000,
		high: 144000,
		rate: 10,
		number: 2520
	}, {
		low: 144000,
		high: 300000,
		rate: 20,
		number: 16920
	}, {
		low: 300000,
		high: 420000,
		rate: 25,
		number: 31920
	}, {
		low: 420000,
		high: 660000,
		rate: 30,
		number: 52920
	}, {
		low: 660000,
		high: 960000,
		rate: 35,
		number: 85920
	}, {
		low: 960000,
		high: 10000000,
		rate: 45,
		number: 181920
	}],
	contains(num) {
		let suitable;
		this.range.forEach(function(value) {
			if (!suitable && num >= value.low && num <= value.high) {
				suitable = value;
			}
		});
		return suitable;
	}
}

export default alg;
