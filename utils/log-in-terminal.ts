const terminal = document.querySelector('.terminal pre') as HTMLPreElement;

export function terminalLog(text: string | number, where: InsertPosition = 'beforeend') {
	terminal.insertAdjacentHTML(where, `<div>${text}</div>`);
}
