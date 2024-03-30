function copy_text(id){
    // let text = document.getElementById("custom_output").value;
    navigator.clipboard.writeText(document.getElementById(id).value);
}

function clear_text(){
	document.getElementById("text_before").value = ""
	document.getElementById("text_after").value = ""
	document.getElementById("text_translated").value = ""
}

function process(){
    async function run() {
		let text = await eel.process(document.getElementById("text_before").value)();
		document.getElementById("text_after").value = text;
	}
	run();
}

function open_translator(translator){
    async function run(){
		await eel.open_translator(translator, document.getElementById("text_after").value)();
	}
	run();
}

// function reprace_math_typeset(is_checked){
// 	if(is_checked){
// 		process();
// 		async function run() {
// 			let text = await eel.reprace_math_typeset(document.getElementById("text_after").value)();
// 			document.getElementById("text_after").value = text;
// 		}
// 		run();
// 	}
// 	else{
// 		process();
// 	}
// }

// function extraction_math_typeset(){
// 	async function run() {
// 		let matchtext_arr = await eel.reprace_math_typeset(document.getElementById("text_before").value)();
// 		return matchtext_arr
// 	}
// 	return run();
// }


function reprace_math_typeset(textarea_id){
	async function run(){
		process()
		let textarea_element = document.getElementById(textarea_id)
		let matchtext_arr = await eel.extraction_math_typeset(document.getElementById("text_before").value)();
		textarea_element.value = await eel.reprace_math_typeset(textarea_element.value, matchtext_arr)();
	}
	run();
}


function restore_math_typeset(){
	async function run(){
		let textarea_element = document.getElementById("text_translated")
		let matchtext_arr = await eel.extraction_math_typeset(document.getElementById("text_before").value)();
		textarea_element.value = await eel.restore_math_typeset(textarea_element.value, matchtext_arr)();
	}
	run();
}