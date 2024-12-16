const tossupMarkers = new RegExp("^[^(a-z|A-Z)]*(?:TU|Tossup)[^(a-z|A-Z)]+", 'm') //?: makes the group non-capturing so it's not included in split
const bonusMarkers = /\s+(?:B(?:onus)?\s*(?:1|2)[\W\s]+)+/ //"B#" (last + to account for questions where bonus 1 and 2 are combined so it consumes stuff like B1&B2)
const answerPattern = /(?<=\s+)[^a-z__]+$/
const urlPattern = /(?<=\/d\/)[^/]*/

let newQuestions = []
const sampleText = `TU 1\nWhat mythological group was made up of Thalia, Terpsichore, and seven others?\nTHE MUSES\nB1\nWho was the mother of the Muses?\nMNEMOSYNE\nB2\nIn one story, the Muses were said to have been born when what creature touched the Helicon\nspring?\nPEGASUS\nTU 2\nFrom what Latin verb with what meaning do we get the English words overt and aperture?\nAPERIO = TO OPEN, UNCOVER, DISCLOSE\nB1\nFrom what Latin verb with what meaning do we get the English words augment and auction?\nAUGEO = TO INCREASE\nB2\nFrom what Latin verb with what meaning do we get the English word obedience?\nAUDIO = TO HEAR, LISTEN TO\nTU 3\nFor the verb capio, capere give the 3rd person, plural, future, active, indicative\nCAPIENT\nB1\nChange capient to the future perfect\nCEPERINT\nB2\nChange ceperint to the passive voice\nCAPTI ERUNT\nTU 4\nWhat structure located between the Palatine and Aventine Hills was known for its chariot racing?\nCIRCUS MAXIMUS\nB1&B2\nThe emperor Domitian added two colored factions to the original four. For five points each,\nname these colors\nPURPLE & GOLD\n2017 TSJCL CERTAMEN\nNOVICE DIVISION ROUND 1\n2\nTU 5\nSay in Latin: Do you like learning the Latin language?\nAMASNE / AMATISNE / DILIGISNE / DILIGITISNE DISCERE LINGUAM\nLATINAM?\nB1\nSay in Latin: You are not going to school tomorrow, are you?\nNUM CRAS AD SCHOLAM IS / ITIS?\n// NUM ES ITURUS / ESTIS ITURI AD SCHOLAM CRAS?\nB2\nSay in Latin: You want to win this contest don’t you?\nNONNE HOC CERTAMEN VIS / VULTIS / CUPIS / CUPITIS VINCERE?\n[SCORE CHECK]\nTU 6\nWhat state has the motto “ad astra per aspera”?\nKANSAS\nB1\nWhat state has the motto “dum spiro, spero”?\nSOUTH CAROLINA\nB2\nWhat is the Latin motto of the state of Missouri?\nSALUS POPULI SUPREMA LEX (ESTO)\nTU 7\nGive the accusative singular for the phrase solum animal.\nSOLUM ANIMAL\nB1\nMake solum animal genitive\nSOLIUS ANIMALIS\nB2\nMake solius animalis plural\nSOLORUM ANIMALIUM\nTU 8\nWho preceded and succeeded Caligula?\nTIBERIUS (FORMER); CLAUDIUS (LATTER)\nB1\nWho preceded and succeeded Titus?\nVESPASIAN (FORMER); DOMITIAN (LATTER)\nB2\nWho preceded and succeeded Marcus Aurelius?\nANTONINUS PIUS (FORMER); COMMODUS (LATTER)\n2017 TSJCL CERTAMEN\nNOVICE DIVISION ROUND 1\n3\nTU 9\nWho attempted to delay choosing a new husband by unraveling the shroud she wove for her\nfather-in-law?\nPENELOPE\nB1\nName her father-in-law.\n LAERTES\nB2\nFor how long was Penelope able to keep up this ruse?\nTHREE YEARS\nTU 10\nListen carefully to the following passage about this adapted Shakespeare scene which I will read\ntwice and answer the questions that follow in English.\nRex cum suo fratre ivit ut nuptiās suae filiae videret. Post nuptiās, dum domum navigant, subito,\nmagna tempestas accidit. Viri timent et deos evocant, sed dei eos non audiunt. Nave pervertā,\nviri ad insulam ignotam pervenerunt.\nThe question: With whom did the king travel?\nHIS BROTHER\nB1\nWhat was the purpose of the king’s trip?\nTO SEE HIS DAUGHTER’S WEDDING/MARRIAGE\nB2\nWhen the storm occurred, what did the men do?\nTHEY CALL OUT TO THE GODS/ASK THE GODS FOR HELP\n(FOR MODERATOR REFERENCE FOR PASSAGE: A king went with his brother to see his\ndaughter’s wedding. After the wedding, while, they were sailing home, suddenly, a great storm\noccurred. The men are scared and call out to the gods, but the gods do not hear them. After their\nship was overturned, the men arrived on an unknown island.)\n[SCORE CHECK]\nTU 11\nAccording to Hesiod, what primordial being was the mother of Ourea, Pontus, and Uranus?\n GAIA\nB1\nWhat physical feature of the earth does Ourea personify?\nMOUNTAINS\nB2\nHow many Titans and Titanesses did Gaia bear with Uranus?\nTWELVE\n2017 TSJCL CERTAMEN\nNOVICE DIVISION ROUND 1\n4\nTU 12\nWhere in Rome would you go to see venationes and naumachiae?\n COLOSSEUM / AMPHITHEATER\nB1\nWhich emperor was credited with the construction of the Colosseum?\nTITUS\nB2\nWho built the first permanent amphitheater in Rome?\nSTATILIUS TAURUS\nTU 13\nIdentify the case and use of the word for friend in the following sentence: Hic equus carissimus\nmeo amico est.\nDATIVE WITH (SPECIAL) ADJECTIVES\nB1\n… Nescivi meum amicum mortuum esse.\nACCUSATIVE SUBJECT (OF AN INDIRECT STATEMENT)\nB2\n… Ille altior meo amico est.\nABLATIVE COMPARISON\nTU 14\nWho agreed to betray her father and aid Jason on the condition that he would take her with\nhim?\nMEDEA\nB1\nAmong the tasks that Jason was assigned, one was to plough a field with fire-breathing oxen that\nhe had to yoke himself. How did Medea aid him in this seemingly impossible task?\nSHE GAVE HIM A POTION THAT WOULD PROTECT HIM\nB2\nWhom did Medea butcher to ensure her and Jason’s flight from Colchis?\nABSYRTUS (PROMPT ON HER BROTHER)\nTU 15\nTranslate the following sentence into English: Militēs hostem magnā cum vi oppugnaverant.\nTHE SOLDIERS HAD ATTACKED THE ENEMY WITH GREAT FORCE\nB1\n… Hoste victō, militēs regī suam victoriam nuntiaverunt.\nWHEN THE ENEMY WAS DEFEATED (AFTER/WITH THE ENEMY HAVING BEEN\nDEFEATED), THE SOLDIERS ANNOUNCED THEIR VICTORY TO THE KING\nB2\n… Rex dicet suos milites celerrimōs et potentissimōs omnium esse.\nTHE KING WILL SAY THAT HIS SOLDIERS ARE THE SWIFTEST AND MOST\nPOWERFUL OF ALL.\n2017 TSJCL CERTAMEN\nNOVICE DIVISION ROUND 1\n5\n[SCORE CHECK]\nTU 16\nWhat new institution did Diocletian establish consisting of Caesares and Augusti?\nTETRARCHY\nB1\nWhat man did Diocletian defeat at the Margus River in 285 AD to become emperor of Rome?\nCARINUS\nB2\nWho was Diocletian’s Caesar in the East?\nGALERIUS\nTU 17\nQuid anglice significat tum?\nTHEN, AT THAT TIME\nB1\nQuid anglice significat tam?\nSO, SO FAR, TO SUCH A DEGREE\nB2\nQuid anglice significat tamen?\nHOWEVER, YET, NEVERTHELESS\nTU 18\nWhat Titan offered to take the immortality of the centaur Chiron, thereby allowing Chiron to die\nin peace?\nPROMETHEUS\nB1\nWhy did Chiron wish to die?\nHE HAD BEEN POISONED BY THE BLOOD OF THE HYDRA\nB2\nWho would ironically meet a similar fate as Chiron, as he was the one who accidentally shot him\nwith a poisoned arrow?\nHERACLES\nTU 19\nGive a Latin synonym for the word teneo.\nHABEO\nB1\nGive a Latin synonym for the word interficio.\nNECO / CAEDO / OCCIDO\nB2\nGive a Latin synonym for the word porto.\nFERO / GERO\n2017 TSJCL CERTAMEN\nNOVICE DIVISION ROUND 1\n6\n[SCORE CHECK]\nTU 20\nWhat emperor saw the words “in hoc signo vinces” in a dream and believed that this signified\nthat he would be the victor of Milvian Bridge?\nCONSTANTINE\nB1\nAgainst whom did Constantine face at this battle?\nMAXENTIUS\nB2\nConstantine set up a new capital at Byzantium, which he renamed after himself. Give the modern\nday name of this city.\nISTANBUL`

function getQuestions(){
    if (document.getElementById("pasteText").checked){
        addToBank(document.getElementById("pasteTextInput").value)
    }
    else if(document.getElementById("googleDocLink").checked){
        let url = document.getElementById("googleDocLinkInput").value
        url = url.match(urlPattern)
        url = "https://www.googleapis.com/drive/v3/files/" + url + "/export?key=AIzaSyDMYZkARA28hTV0YjPlX4klTmxgUyrdgFQ&mimeType=text/plain"
        fetch(url)
            .catch((error)=> {
                updateStatus("error", "Error - " + error)
            })
            .then((response)=>{
                if (response.status==200){
                    response.text()
                        .then((data) => {console.log(data); addToBank(data)})}
                else {
                    updateStatus("error", "Error: " + response.status + " " + response.statusText)}
            })     
    }
}

function splitQuestions(fullText){
    updateStatus("status", "Processing questions...")
    let addedQuestions = []
    // initial split
    newQuestions = fullText.split(tossupMarkers)
    if (newQuestions.length == 1) {
        newQuestions = fullText.split(/(?<=^|\n)[0-9]{1,2}(?:[\.:]|\s-)\s/)
    }
    newQuestions.splice(0, 1) //removes first string; if no markers found will consist of full text, if starts with marker first string will be empty, else will contain junk before first q
    if (newQuestions.length == 0) {
        updateStatus("error", "Could not find questions. Please check supported question formats.")
    }

    newQuestions.forEach(element => {
        temp = element.split(bonusMarkers)
        question = {}
        let split = separateAnswer(temp[0])
        if(split){
            question.tossup = split[0]
            question.tossupAnswer = split[1]
        }
        for (let i = 1; i < temp.length; i++) {
            let split = separateAnswer(temp[i])
            if(split){
                question["bonus" + i] = split[0]
                question["bonus" + i + "Answer"] = split[1]
            }
        }
        addedQuestions.push(question)
    });
    
    return addedQuestions
}

function separateAnswer(text){
    text = text.trim()
    let answer = text.match(answerPattern)
    if (!answer) { // if answer is null
        answer = text.match(/(?<=[\.?!:"”]\s+).+$/) // lookbehind (one of the punctuation marks followed by some form of whitespace 1+ times), then any non-linebreak at least one time before the end of the string
    }
    if (!answer){
        answer = text.match(/.+$/) // last line
    }
    if (answer) { // if the answer exists after both attempts
        answer = answer[0] //.match() returns an array, the first element is the answer
        let question = text.replace(answer, "")
        return [question.trim(), answer.trim()]
    }
    else {
        updateStatus("error", "Answers were not found for some questions. See the console for more information.")
        console.log("Answer not found for question: " + question)
    }
}

function addToBank(fullText){
    let toAdd = splitQuestions(fullText)
    console.log(toAdd)
    for (let i = 0; i < toAdd.length; i++){
        questionBank.push(toAdd[i])
    }
    if (!("error" == document.getElementById("statusBox").className)){
        updateStatus("confirmation", "Questions added!")
    }
    enableStart()
}
