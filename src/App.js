import { useState } from "react";

function App() {


  const [input, setInput] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault();
    var inputString = input + "#";
    const stateList = ["q0", "q1", "q2",  "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10",
    "q11", "q12", "q13", "q14", "q15", "q16", "q17", "q18", "q19", "q20",
    "q21", "q22", "q23", "q24", "q25", "q26"
    ]

    const alphabetList = [];
    for (let i = 0; i <= 26; i++) {
        alphabetList.push(String.fromCharCode(i + 96));
    }

    var transitionTable = {}
    for (let i = 0; i < stateList.length; i++) {
        transitionTable[stateList[i]] = {}
        for (let j = 0; j < alphabetList.length; j++) {
            transitionTable[stateList[i]][alphabetList[j]] = "error"
        }
        transitionTable[stateList[i]]["#"] = "error"
        transitionTable[stateList[i]][" "] = "error"
    }

    transitionTable['q0'][' '] = 'q0'
    
    // au
    transitionTable['q0']['a'] = 'q1'   
    transitionTable['q1']['u'] = 'q2'
    
    // abit
    transitionTable['q1']['b'] = 'q3'
    transitionTable['q3']['i'] = 'q4'
    transitionTable['q4']['t'] = 'q2'

    // manjait
    transitionTable['q0']['m'] = 'q5'
    transitionTable['q5']['a'] = 'q6'
    transitionTable['q6']['n'] = 'q7'
    transitionTable['q7']['j'] = 'q8'
    transitionTable['q8']['a'] = 'q3'

    // mangaut
    transitionTable['q7']['g'] = 'q9'
    transitionTable['q9']['a'] = 'q10'
    transitionTable['q10']['u'] = 'q4'

    // marmeam
    transitionTable['q6']['r'] = 'q11'
    transitionTable['q11']['m'] = 'q12'
    transitionTable['q12']['e'] = 'q13'
    transitionTable['q13']['a'] = 'q14'
    transitionTable['q14']['m'] = 'q2'

    // marnida
    transitionTable['q11']['n'] = 'q15'
    transitionTable['q15']['i'] = 'q16'
    transitionTable['q16']['d'] = 'q17'
    transitionTable['q17']['a'] = 'q2'

    // ibana
    transitionTable['q0']['i'] = 'q18'
    transitionTable['q18']['b'] = 'q19'
    transitionTable['q19']['a'] = 'q20'
    transitionTable['q20']['n'] = 'q17'

    //injam
    transitionTable['q18']['n'] = 'q21'
    transitionTable['q21']['j'] = 'q13'

    // tas
    transitionTable['q0']['t'] = 'q22'
    transitionTable['q22']['a'] = 'q23'
    transitionTable['q23']['s'] = 'q2'
    
    // taho
    transitionTable['q23']['h'] = 'q24'
    transitionTable['q24']['o'] = 'q2'

    // bal
    transitionTable['q0']['b'] = 'q25'
    transitionTable['q25']['a'] = 'q26'
    transitionTable['q26']['l'] = 'q2'

    // accept
    transitionTable['q0'][' '] = 'q0'
    transitionTable['q2'][' '] = 'q0'
    transitionTable['q0']['#'] = 'accept'
    transitionTable['q2']['#'] = 'accept'

    var idxchar = 0;
    var currentToken = '';
    var currentState = 'q0';
    var accepted = false;

    while (currentState !== 'accept') {
        var currentchar = inputString[idxchar];
        currentToken += currentchar;
        currentState = transitionTable[currentState][currentchar];
        if (currentState === 'q2') {
            console.log('current token: ', currentToken, ", valid");
            currentToken = '';
        }
        if (currentState === 'error') {
            console.log('error');
            accepted = false;
            break;
        }
        idxchar++;
    }
    if (currentState === 'accept') {
        console.log('semua token di input: ', input, ', valid');
        accepted = true;
    }

    if (accepted) {
      var tokens = input.split(" ");
      tokens.push("EOS");
  
      // symbols definition
  
      const non_terminal = ['S', 'SU', 'V', 'O']
      const terminal =['au','ibana','haha','injam','marmeam','mengaut','manjait','marnida','bal','abit','tas']
  
      // parse table definition
  
      var parse_table = {}
  
      parse_table['S'] = {
          'au': ['SU', 'V', 'O'],
          'ibana': ['SU', 'V', 'O'],
          'haha': ['SU', 'V', 'O'],
          'injam': ['SU', 'V', 'O'],
          'marmeam': ['SU', 'V', 'O'],
          'mengaut': ['SU', 'V', 'O'],
          'manjait': ['SU', 'V', 'O'],
          'marnida': ['SU', 'V', 'O'],
          'bal': ['SU', 'V', 'O'],
          'abit': ['SU', 'V', 'O'],
          'tas': ['SU', 'V', 'O'],
          'EOS': ['error']
      }
  
      parse_table['SU'] = {
          'au': ['au'],
          'ibana': ['ibana'],
          'haha': ['haha'],
          'marmeam': ['marmeam'],
          'mengaut': ['mengaut'],
          'manjait': ['manjait'],
          'marnida': ['marnida'],
          'bal': ['error'],
          'abit': ['error'],
          'tas': ['error'],
          'EOS': ['error']
      }
  
      parse_table['V'] = {
          'au': ['error'],
          'ibana': ['error'],
          'haha': ['error'],
          'injam': ['injam'],
          'marmeam': ['marmeam'],
          'mengaut': ['mengaut'],
          'manjait': ['manjait'],
          'marnida': ['marnida'],
          'bal': ['error'],
          'abit': ['error'],
          'tas': ['error'],
          'EOS': ['error']
      }
  
      parse_table['O'] = {
          'au': ['error'],
          'ibana': ['error'],
          'haha': ['error'],
          'injam': ['error'],
          'marmeam': ['error'],
          'mengaut': ['error'],
          'manjait': ['error'],
          'marnida': ['error'],
          'bal': ['bal'],
          'abit': ['abit'],
          'tas': ['tas'],
          'EOS': ['accept']
      }
  
      // stack initialization
      var stack = []
      stack.push('#')
      stack.push('S')
  
      var idx_token = 0
      var symbol = tokens[idx_token]
  
      while (stack.length > 0) {
          var top = stack[stack.length - 1]
          console.log('top = ', top)
          console.log('symbol = ', symbol)
          if (terminal.includes(top)) {
              console.log('top adalah simbol terminal')
              console.log('top = ', top)
              if (top === symbol) {
                  stack.pop()
                  idx_token += 1
                  symbol = tokens[idx_token]
                  if (symbol === 'EOS') {
                      console.log('stack = ', stack)
                      stack.pop()
                  }
              } else {
                  console.log('error')
                  break
              }
          } else if (non_terminal.includes(top)) {
              console.log('top adalah simbol non terminal')
              if (parse_table[top][symbol] &&  parse_table[top][symbol][0] !== 'error') {
                  stack.pop()
                  var symbols_to_be_pushed = parse_table[top][symbol]
                  for (var i = symbols_to_be_pushed.length - 1; i >= 0; i--) {
                      stack.push(symbols_to_be_pushed[i])
                  }
              } else {
                  console.log('error')
                  break
              }
          } else {
              console.log('error')
              break
          }
          console.log('stack = ', stack)
          console.log('\n')
      }
      
      // conclusion:
      console.log('\n')
      if (symbol === 'EOS' && stack.length === 0) {
          console.log('input string', input, 'diterima sesuai grammar')
      } else {
          console.log('input string', input, 'tidak diterima sesuai grammar')
      }
    } else {
        console.log('format sentence tidak sesuai')
    }
  }

  return (
    <div className="bg-pastelpink-500">
      <div className="flex h-screen w-full container">
        <form action="" className="bar" onSubmit={handleSubmit}>
            <input type="text" placeholder="Masukkan sebuah kalimat" value={input} onChange={(e) => setInput(e.target.value)} name="sentence" autoComplete="off" id="sentence"/>
            <button type="submit" className="bg-sky-200 opacity-50 hover:bg-blue-700 p-4 rounded-full" id="button">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </form>
    </div>
    </div>
    
  );
}

export default App;
