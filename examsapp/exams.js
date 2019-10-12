let questions = [{

}]; 

function renderQuestion(question, questionType) {
        
    let imageMarkup = question.imgSrc ? '<img src="' + question.imgSrc + '">' : '';
    let questionMarkup = '<p>' + question.question +  '</p>';
    let answermarkup = '';

    return imageMarkup + questionMarkup + answermarkup;
}