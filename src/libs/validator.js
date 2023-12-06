function validateIBGE(code) {
    return code.length === 6;
  }
  
  function validateCPF(cpf) {
    // remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
  
    // verifica se o CPF possui 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }
  
    // verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
  
    // verifica o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    let digit = remainder < 2 ? 0 : 11 - remainder;
    if (digit !== parseInt(cpf.charAt(9))) {
      return false;
    }
  
    // verifica o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    digit = remainder < 2 ? 0 : 11 - remainder;
    if (digit !== parseInt(cpf.charAt(10))) {
      return false;
    }
  
    return true;
  }
  
  function validateCNS(cns) {
    if (cns.length !== 15) {
      return false;
    }
  
    // Verifica se todos os caracteres são números
    if (!/^\d+$/.test(cns)) {
      return false;
    }
  
    // Verifica se o primeiro dígito é 1, 2, 7, 8 ou 9
    const primeiroDigito = parseInt(cns.charAt(0));
    if (![1, 2, 7, 8, 9].includes(primeiroDigito)) {
      return false;
    }
    return true;
  }
  
  function validateCBO(code) {
    return code.length === 6;
  }
  
  function validateCNES(cnes) {
    if (!/^\d+$/.test(cnes)) {
      return false;
    }
    if (cnes.length !== 7) {
      return false;
    }
    return true;
  }
  
  function validateCompetence(competence) {
    return /\d{2}\/\d{4}/.test(competence);
  }
  
  export { validateCBO, validateCNS, validateCompetence, validateCPF, validateIBGE, validateCNES };
  