// 전체 리셋 함수: 모든 입력 필드와 결과 초기화
function resetForm() {
    document.getElementById("st").value = "";
    document.getElementById("wf").value = "";
    document.getElementById("cm").value = "";
    document.getElementById("cdm").value = "";
    document.getElementById("wb").value = "";
    document.getElementById("cb").value = "";
    document.getElementById("gk").value = "";
    document.getElementById("stNumber").value = 1;
    document.getElementById("wfNumber").value = 1;
    document.getElementById("cmNumber").value = 1;
    document.getElementById("cdmNumber").value = 1;
    document.getElementById("wbNumber").value = 1;
    document.getElementById("cbNumber").value = 1;
    document.getElementById("gkNumber").value = 1;
    document.getElementById("teamCount").value = 1;
    document.getElementById("teamNames").value = "";
    document.getElementById("result").innerHTML = "";
}

// 팀 리셋 함수: 팀 목록만 초기화하고 선수 리스트와 숫자는 그대로 유지
function resetTeams() {
    document.getElementById("result").innerHTML = "";
}

function getRandomPlayers(players, numberOfPlayers, usedPlayers) {
    const availablePlayers = players.filter(player => !usedPlayers.includes(player));
    const selectedPlayers = [];
    
    while (selectedPlayers.length < numberOfPlayers && availablePlayers.length > 0) {
        const randomIndex = Math.floor(Math.random() * availablePlayers.length);
        const selectedPlayer = availablePlayers[randomIndex];
        selectedPlayers.push(selectedPlayer);
        usedPlayers.push(selectedPlayer);
        availablePlayers.splice(randomIndex, 1); // 선택된 플레이어는 목록에서 제거
    }
    
    return selectedPlayers;
}

function generateRandomTeams() {
    const positions = [
        { id: 'st', numberId: 'stNumber', label: 'ST' },
        { id: 'wf', numberId: 'wfNumber', label: 'WF' },
        { id: 'cm', numberId: 'cmNumber', label: 'CM' },
        { id: 'cdm', numberId: 'cdmNumber', label: 'CDM' },
        { id: 'wb', numberId: 'wbNumber', label: 'WB' },
        { id: 'cb', numberId: 'cbNumber', label: 'CB' },
        { id: 'gk', numberId: 'gkNumber', label: 'GK' }
    ];

    const teamCount = parseInt(document.getElementById('teamCount').value);
    let teamNames = document.getElementById('teamNames').value.split(',').map(name => name.trim());

    // 팀 이름이 팀 수보다 적으면 기본 이름으로 채워줌
    for (let i = teamNames.length; i < teamCount; i++) {
        teamNames.push(`Team ${i + 1}`);
    }

    let resultHtml = '';
    let usedPlayers = []; // 중복된 선수 방지를 위해 사용된 선수 리스트 저장

    for (let team = 1; team <= teamCount; team++) {
        let teamLineup = `<div class="team"><h3>${teamNames[team - 1]}</h3>`;
        
        positions.forEach(position => {
            const players = document.getElementById(position.id).value.split(',').map(player => player.trim());
            const numberOfPlayers = parseInt(document.getElementById(position.numberId).value);
            
            if (players.length >= numberOfPlayers) {
                const selectedPlayers = getRandomPlayers(players, numberOfPlayers, usedPlayers);
                if (selectedPlayers.length > 0) {
                    teamLineup += `<p><strong>${position.label}:</strong> ${selectedPlayers.join(', ')}</p>`;
                } else {
                    teamLineup += `<p><strong>${position.label}:</strong> No players left!</p>`;
                }
            } else {
                teamLineup += `<p><strong>${position.label}:</strong> Not enough players listed!</p>`;
            }
        });

        teamLineup += `</div>`;
        resultHtml += teamLineup;
    }

    document.getElementById('result').innerHTML = resultHtml;
}
