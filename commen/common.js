export function sexValueToNumber(provider){

	if (provider == '男') {
		return '1'
	}
	if (provider == '女') {
		return '2'
	}
}



export function sexnumberToValue(provider){
	if (provider == '1') {
		return '男'
	}
	if (provider == '2') {
		return '女'
	}
}
