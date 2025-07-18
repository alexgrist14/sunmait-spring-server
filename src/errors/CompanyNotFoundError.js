class CompanyNotFoundError extends Error {
  constructor(message = "Company not found") {
    super(message);
    this.name = "CompanyNotFoundError";
  }
}

module.exports = CompanyNotFoundError;
