function copy_text(id){
    navigator.clipboard.writeText(document.getElementById(id).value);
}

function clear_text(){
	document.getElementById("text_before").value = ""
	document.getElementById("text_after").value = ""
	document.getElementById("text_translated").value = ""
}

async function process(reprace_math_typeset=false){
    // async function run() {
	let text = await eel.process(document.getElementById("text_before").value)();
	if(reprace_math_typeset){
		let matchtext_arr = await eel.extraction_math_typeset(text)();
		text = await eel.reprace_math_typeset(text, matchtext_arr)();
	}
	document.getElementById("text_after").value = text;
	// }
	// run();
}

async function open_translator(translator){
    // async function run(){
	await eel.open_translator(translator, document.getElementById("text_after").value)();
	// }
	// run();
}


async function restore_math_typeset(){
	// async function run(){
	let textarea_element = document.getElementById("text_translated")
	let matchtext_arr = await eel.extraction_math_typeset(document.getElementById("text_before").value)();
	textarea_element.value = await eel.restore_math_typeset(textarea_element.value, matchtext_arr)();
	// }
	// run();
}