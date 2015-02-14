angular.module('invoice1', [])
        .controller('InvoiceController', function () {
            this.yourName = "Nick";
            this.qty = 10;
            this.cost = 100;
            this.inCurr = 'CAD';
            this.currencies = ['USD', 'EUR', 'CAD'];
            this.usdToForeignRates = {
                USD: 1,
                EUR: 0.798230,
                CAD: 1.13459
            };

            this.total = function total(outCurr) {
                return this.convertCurrency(this.qty * this.cost, this.inCurr, outCurr);
            };
            this.convertCurrency = function convertCurrency(amount, inCurr, outCurr) {
                return amount * this.usdToForeignRates[outCurr] / this.usdToForeignRates[inCurr];
            };
            this.pay = function pay() {
                window.alert("Thanks!");
            };
            this.getRandomSpan = function(){
                return Math.floor((Math.random()*6)+1);
            };

        });
