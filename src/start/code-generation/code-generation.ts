
export class CodeGeneration {

  constructor() { }

  public generation() { }
}

// // the best var
// export class SourceAccountP <T extends Partial<Account>>{

//     public model: T;

//     constructor(config: T) {
//       this.model = Object.assign({}, config);
//     }

//     public withdraw(amount: number): void {
//       const text = 'Withdraw: ' + amount;
//       console.log(text);
//       this.model.balance -= amount;
//       console.log('Balance: ' + this.model.balance);
//     }
//   }
//   // ====================================================
//   export class SourceAccountPp<T>{

//     public model: Partial<Account>;

//     constructor(config: T) {
//       this.model = Object.assign({}, config);
//     }

//     public withdraw(amount: number): void {
//       const text = 'Withdraw: ' + amount;
//       console.log(text);
//       this.model.balance -= amount;
//       console.log('Balance: ' + this.model.balance);
//     }
//   }
