var vscode = require("vscode");

var Editor = function (appName) {

    // if no editor found warn and return
    var codeEditor = vscode.window.activeTextEditor;
    if (!codeEditor) {
        vscode.window.showWarningMessage('No active file!');
        return;
    }

    // get the document
    var doc = codeEditor.document;
    var languages = vscode.workspace.getConfiguration(appName)["languages"];

    for (var languageId in languages) {
        if (doc.languageId == languageId) {
            // if the document is not saved warn and return
            if (doc.isDirty) {
                vscode.window.showWarningMessage('Save the file!');
                return;
            }else{
                this.languageId = languageId;
                this.selText = doc.getText(codeEditor.selection);
                this.docText = doc.getText();
                this.filePath = "currentFilePath";
                return;
            }
        }else{
            // current language is not valid
            console.log(languageId + ": Not a valid language!");
        }
    }
    // If no valid language found in the file, warn and return
    vscode.window.showWarningMessage('No valid language found!');
    return;
}

module.exports = Editor;