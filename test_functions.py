import sys
from sympy import *
from sympy import nan
from sympy.parsing.sympy_parser import parse_expr
import mpmath as mp
import json
def transform(function):
    #replace ^ with ** and so on
    function = function.replace('^' , "**")
    return function
   

    return function

def is_complex(x):
    if isinstance(x, complex):
        return True
    return False


def log2(x):
    return sympy.log(x, 2)

def evaluate(function, rangestart, rangeend, precision):
    i = rangestart
    data = []
    exp = transform(function)
    x = symbols('x')
    e = symbols('e')
    
    local_dict={
            "log1": lambda x: sympy.log(x, 1)
            }
    for j in range(2,200):
        local_dict["log" + str(j)] = lambda x : log(x, j) 
    
    while i < rangeend:
        parsed = parse_expr(exp, local_dict )
        y = parsed.subs(x, i).subs(e, mp.e).evalf()

        if not y == nan:
	    try:
                datapoint = {'x': round(i,4) , 'y': str(round(y,4))}
                data.append( datapoint)
            except:
		print("Error adding point")
        i += precision
    d = json.dumps(data)
    return d


def main():
    print(evaluate("ln(x)", -1, 230, 1))
    exit(0)

if __name__ == "__main__":
    main()
