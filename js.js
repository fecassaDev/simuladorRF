const myApp = Vue.createApp({
  data() {
    return {
      valorInvestido: "",
      juros: "",
      totalAcumulado: "",
      isStep2Active: false,
      action: "",
    };
  },
  methods: {
    NumericValidation(event) {
      var charStr = String.fromCharCode(event.keyCode);
      if (!charStr.match(/^[0-9]+$/)) event.preventDefault();

      nonFormatInput = event.target.value.replace(".", "").replace(",", "");

      if (event.target.id == "amount") {
        if (nonFormatInput.length >= 7) {
          event.preventDefault();
        }
      } else if (event.target.id == "profitability") {
        if (nonFormatInput.length >= 4) {
          event.preventDefault();
        }
      } else if (event.target.id == "deadline") {
        if (nonFormatInput.length >= 3) {
          event.preventDefault();
        }
      }
    },
    AutoFormat(event) {
      const regExp = /,/g;
      var inputValue = event.target.value.replace(",", "").replace(".", "");
      var floatInputValue = 0;

      floatInputValue = parseFloat(inputValue) / 100;

      if (floatInputValue > 0) {
        event.target.value = floatInputValue.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        });
      } else event.target.value = "";
    },
    submitSimulation() {
      if (this.action == "Calcular") this.Calculate();
      else if (this.action == "Voltar") this.isStep2Active = false;
      else {
        this.$refs.myForm.reset();
        this.isStep2Active = false;
      }

      window.scrollTo(0,0);
    },
    SetFormAction(action) {
      this.action = action;
    },
    Calculate() {
      var $taxaAnual = parseFloat(
        this.$refs.taxSimulation.value.replace(".", "").replace(",", ".")
      );
      var $principal = parseFloat(
        this.$refs.amoutSimulation.value.replace(".", "").replace(",", ".")
      );
      var $prazo = parseInt(this.$refs.deadlineSimulation.value);

      //Converter taxa mensal para anual
      //Fórmula: iM = [(1 + iA)^q/t – 1] x 100
      var $iM = (Math.pow(1 + $taxaAnual / 100, 1 / 12) - 1) * 100;
      $iM = $iM.toFixed(4);

      //Calculo de Juros compostos
      //Fórmula:  M = C (1+i)^t
      var $montante = $principal * Math.pow(1 + $iM / 100, $prazo);

      this.valorInvestido = $principal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      this.juros = ($montante - $principal).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      this.totalAcumulado = $montante.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      this.isStep2Active = true;      
    },
  },
});

myApp.mount("#myApp");
