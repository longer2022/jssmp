// Ref: https://www.deviantart.com/thanhdat1710/art/Jscript-library-search-1-1-376360761
// Author:  thanhdat1710

export function prcess_string(str: string) {
	let str_: string[] = [];
	let str__: string[] = [];
	str = str.toLowerCase();
	str__ = str.split(" ").sort();
	for (let i in str__) {
		if (str__[i] != "")
			str_.push(str__[i]);
	}
	return str_;
}

export function prcess_string2(str: string) {
	let str_ = null;
	str = str.toLowerCase();
	let str__ = str.split(" ").sort();
	for (let i in str__) {
		if (str__[i] != "")
			str_ = { value: str__[i], next: str_ };
	}
	return str_;
}



//HIGH PERFOMANCE AREA START =========================================

export function match(input, str) {
	var i = str.length - 1;
	if (i != -1) {
		do {
			if (input.indexOf(str[i]) < 0)
				return false;
		} while (i--);
	}
	return true;
}

export function match2(input, str) {
	for (; str; str = str.next)
		if (input.indexOf(str.value) < 0)
			return false;
	return true;
}
