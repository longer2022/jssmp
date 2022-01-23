// Ref: https://www.deviantart.com/thanhdat1710/art/Jscript-library-search-1-1-376360761
// Author:  thanhdat1710

export function prcess_string(str) {
	str_ = [];
	str = str.toLowerCase();
	var str = str.split(" ").sort();
	for (var i in str) {
		if (str[i] != "")
			str_.push(str[i]);
	}
	return str_;
}

export function prcess_string2(str) {
	str_ = null;
	str = str.toLowerCase();
	var str = str.split(" ").sort();
	for (var i in str) {
		if (str[i] != "")
			str_ = { value: str[i], next: str_ };
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
