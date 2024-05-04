import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "please-no-rotation-tab-switching" is now active!');

	const nextTabCommand = vscode.commands.registerCommand('please-no-rotation-tab-switching.nextTab', () => {
		const activeGroup = vscode.window.tabGroups.all.find(group => group.isActive);
		const activeGroupTabsLength = activeGroup?.tabs.length;
		const activeEditorIndex = activeGroup?.tabs.findIndex(tab => tab.isActive);
		const isLastInGroup = activeGroupTabsLength && activeEditorIndex === activeGroupTabsLength - 1;
		const isFirstInGroup = activeEditorIndex === 0;
		
		if (!isLastInGroup) {
			vscode.commands.executeCommand('workbench.action.nextEditor');
			return;
		}
	});
	const prevTabCommand = vscode.commands.registerCommand('please-no-rotation-tab-switching.prevTab', () => {
		const activeGroup = vscode.window.tabGroups.all.find(group => group.isActive);
		const activeEditorIndex = activeGroup?.tabs.findIndex(tab => tab.isActive);
		const isFirstInGroup = activeEditorIndex === 0;
		
		if (!isFirstInGroup) {
			vscode.commands.executeCommand('workbench.action.previousEditor');
			return;
		}
	});

	context.subscriptions.push(nextTabCommand, prevTabCommand);
}

export function deactivate() {}
