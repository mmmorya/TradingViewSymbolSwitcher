document.addEventListener('DOMContentLoaded', function() {
  const symbolInput = document.getElementById('symbolInput');
  const switchSymbolButton = document.getElementById('switchSymbol');
  const v40ListContainer = document.getElementById('v40List');
  const v40NextListContainer = document.getElementById('v40NextList');
  const currentlyTradingListContainer = document.getElementById('currentlyTradingList');

  const v40List = ["NIFTYBEES", "PAGEIND", "PFIZER", "PGHH", "PIDILITIND", "RELIANCE", "SANOFI", "TCS", "TITAN", "WHIRLPOOL"];
  const v40NextList = ["3MINDIA", "5PAISA","ANGELONE", "ASTRAZEN", "BAYERCROP", "BOSCHLTD", "CAPLIPOINT", "CERA", "DIXON", "EICHERMOT", "EQUITASBNK", "ERIS", "FINEORG", "FINCABLES", "GODREJCP", "HONAUT", "ISEC", "INDIGOPNTS", "KANSAINER", "LALPATHLAB", "LUXIND", "MCX", "MOTILALOFS", "OFSS", "POLYCAB", "RADICO", "RAJESHEXPO", "RELAXO", "SFL", "SIS", "SUNTV", "SYMPHONY", "TATAELXSI", "TEAMLEASE", "TTKPRESTIG", "UNITDSPR", "UJJIVANSFB", "VIPIND", "VINATIORGA"];
  const currentlyTradingList = ["5PAISA", "UJJIVANSFB","ANGELONE", "MOTILALOFS", "SYMPHONY", "VIPIND"];

  function populateSymbolList(container, list) {
    list.forEach(symbol => {
      const div = document.createElement('div');
      div.textContent = symbol;
      div.className = 'symbol-item';
      div.addEventListener('click', () => switchSymbol(symbol));
      container.appendChild(div);
    });
  }

  switchSymbolButton.addEventListener('click', function() {
    const symbol = symbolInput.value.trim();
    if (symbol) {
      switchSymbol(symbol);
      symbolInput.value = '';
    }
  });

  function switchSymbol(symbol) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs[0];
      const url = `https://in.tradingview.com/chart/pIR1YZak/?symbol=${encodeURIComponent(symbol)}`;
      chrome.tabs.update(tab.id, { url: url });
    });
  }

  function toggleVisibility(event) {
    const targetId = event.target.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);
    const items = targetElement.getElementsByClassName('symbol-item');
    Array.from(items).forEach(item => item.classList.toggle('visible'));
  }

  document.querySelectorAll('.list-title').forEach(title => {
    title.addEventListener('click', toggleVisibility);
  });

  populateSymbolList(v40ListContainer, v40List);
  populateSymbolList(v40NextListContainer, v40NextList);
  populateSymbolList(currentlyTradingListContainer, currentlyTradingList);
});
