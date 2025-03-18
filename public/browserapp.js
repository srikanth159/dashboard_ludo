document.getElementById("dashboard-link").onclick = function loadDashboard() {
  // Change the content of the page (e.g., to reload the dashboard)
  document.getElementById("main-content").innerHTML = `
        <div class="w3-container w3-teal">
          <h1>Dashboard</h1>
        </div>
        
        <div class="w3-container">
          <h2>dashdoard</h2>
          <div class="date">
            TODAY:
            </div>
            <div class="listofusers">
              <ul>
                <li id="nwsr">New users</li>
                <li id="dpstd">Deposits</li>
                <li id="mtcrstd">Matches</li>
                <li id="admnern">Admin Earnings</li>
              </ul>
              </div> 
              <div id="wltcnt">
              <div id="wdrncnt">
                <p id='wtrdntxt'>withDrawns:</p>
              </div>
              <div id=ttlwlcnt>
               <p id = "ttlwdcnt"> Total wallet Balance(All users)</p>
               </div> 
              </div>
              <div id ='trackusrcntdpst'>
              <div id="usrcntsct">
               <p id="nrgstusr">New Registered users</p>
               <ul>
                <li>User</li>
                <li>Refer By</li>
                <li>Registered on</li>
                <li>Wallet</li>
                </ul>
              </div>
              <div id=dpstusr>
                <p id="dpstusrtxt">Deposit by users</p>
                </div>
              </div>
        </div>
      `;
  const now = new Date();
  const date = now.toLocaleDateString();
  document.getElementsByClassName("date")[0].innerHTML = `Date:${date} `;
  console.log("dashboard current date:", date);
};

// Assign the function to the Dashboard link click event

document.getElementById("Admin-logs-link").onclick = function loadAdminlogs() {
  document.getElementById("main-content").innerHTML = `
     <div class="w3-container w3-teal">
     <h1>Admin logs</h1>
     </div>
           <div id="date">
               TODAY:
            </div>
          <div id="adnmlgeve">
          <h1>Activity logs on admin panel</h1>
          <div id="activityevents">
            <div id="avttmte"></div>
            <div id ="admn-emil">Email address</div>
            <div>Device</div>
          </div>

          </div>  
  `;
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  document.getElementById("date").innerHTML = `Date:${date} `;
  document.getElementById("avttmte").innerHTML = `<p>Date and time:</p> <br>${date} <br> ${time} `;
  console.log("current date:", date);
  const adminEmail = "admin@gmail.com"
  document.getElementById("admn-emil").innerHTML=`<p>Email address</p><br> ${adminEmail}`;
  console.log("email address",adminEmail)
};

document.getElementById("Mangusrs-links").onclick = function loadMangeusers() {
  document.getElementById("main-content").innerHTML = `
       <div class="w3-container w3-teal">
     <h1>users</h1>
     </div>
     <p id=mngusrs>Manage users</p>
     <div id="searchbar">
     <input type="text" name ="searchbar" id="sbrtxt" placeholder="mobile number"/>
     <button id="sbrfndbtnp">Find</button>
     </div>
     <p id="kyctextfld">All Registered users</p>
     <div id ="kncusdet">
       <div>User</div>
       <div>Refer By</div>
       <div>Kyc status</div>
       <div>wallet</div>
       <div>status</div>
       <div>Joined on</div>
       <div>Action</div>
     </div>
    `;
};
document.getElementById("Usrkyc-link").onclick = function LoadUserkycdetails() {
  document.getElementById("main-content").innerHTML = `
        <div class="w3-container w3-teal">
            <h1>User Kyc</h1>
        </div>
        <p id=mngusrs>User Kyc</p>
        <div id="searchbar">
           <input type="text" name ="searchbar" id="sbrtxt" placeholder="mobile number"/>
           <button id="sbrfndbtnp">Find</button>
        </div>
        <p id="kyctextfld">All Kyc Requests</p>

    `;
};
document.getElementById("Usrwthdrn-link").onclick =
  function loadUserWithdrawns() {
    document.getElementById("main-content").innerHTML = `
        <div class="w3-container w3-teal">
            <h1>User withdrawns</h1>
        </div>
        <p id=mngusrs>User Withdrawns</p>
        <div id="searchbar">
           <input type="text" name ="searchbar" id="sbrtxt" placeholder="mobile number"/>
           <button id="sbrfndbtnp">Find</button>
        </div>
        <p id="kyctextfld">All Withdrawn Requests</p>

    `;
  };
document.getElementById("pndgres-link").onclick =
  function loadPendingResults() {
    document.getElementById("main-content").innerHTML = `
     <div class="w3-container w3-teal">
     <h1>Pending Results</h1>
     </div>
         <p id=mngusrs>Pending Results</p>
         <div id="searchbar">
           <input type="text" name ="searchbar" id="sbrtxt" placeholder="mobile number"/>
           <button id="sbrfndbtnp">Find</button>
        </div>
        <p id="kyctextfld">Pending Results Matches</p>
         <div id ="kncusdet">
       <div>Match ID</div>
       <div>Room Code</div>
       <div>Kyc status</div>
       <div>Host</div>
       <div>Joiner</div>
       <div>Joined on</div>
       <div>Amount</div>
       <div>Game</div>
       <div>Action</div>
     </div>
    `;
  };
document.getElementById("cnclrqst-link").onclick =
  function loadCancelRequest() {
    document.getElementById("main-content").innerHTML = `
      <div class="w3-container w3-teal">
        <h1>Cancel Requests</h1>
      </div>
      <p id=mngusrs>Cancel Requests</p>
       <div id="searchbar">
           <input type="text" name ="searchbar" id="sbrtxt" placeholder="mobile number"/>
           <button id="sbrfndbtnp">Find</button>
        </div> 
        <p id="kyctextfld">Pending Results Matches</p>
             <div id ="kncusdet">
                <div>Match ID</div>
                <div>Room Code</div>
                <div>Host</div>
                <div>Joiner</div>
                <div>Reason</div>
                <div>Amount</div>
                <div>Status</div>
              </div>

    `;
  };
document.getElementById("Mngcnflctd-link").onclick =
  function loadMangeConflicts() {
    document.getElementById("main-content").innerHTML = `
     <div class="w3-container w3-teal">
        <h1>Manage conflicts</h1>
      </div>
       <p id=mngusrs>Manage Conflicts</p>
       <div id="searchbar">
           <input type="text" name ="searchbar" id="sbrtxt" placeholder="mobile number"/>
           <button id="sbrfndbtnp">Find</button>
        </div> 
        <p id="kyctextfld">Conflicted Matches</p>
             <div id ="kncusdet">
                <div>Match ID</div>
                <div>Room Code</div>
                <div>Host</div>
                <div>Host Result</div>
                <div>Joiner</div>
                <div>Joiner Result</div>
                <div>Actiion</div>
              </div>
    `;
  };
  document.getElementById("Mtchhistry-link").onclick=function loadMathHistory(){
    document.getElementById("main-content").innerHTML = `
       <div class="w3-container w3-teal">
         <h1>Match History</h1>
       </div>
        <p id=mngusrs>Match History</p>
       <div id="searchbar">
           <input type="text" name ="searchbar" id="sbrtxt" placeholder="mobile number"/>
           <button id="sbrfndbtnp">Find</button>
        </div> 
        <p id="kyctextfld">Matches</p>
             <div id ="kncusdet">
                <div>Match ID</div>
                <div>Room Code</div>
                <div>Hosted By</div>
                <div>Joined By</div>
                <div>Amount</div>
                <div>Game</div>
                <div>Status</div>
              </div>
    `;
  };

document.getElementById("MngmNtfctns-link").onclick =
  function loadManageNotifications() {
    document.getElementById("main-content").innerHTML = `
    <div class="w3-container w3-teal">
      <h1>Manage Notifications</h1>
    </div>
    <p id="mngusrs">Manage Notifications</p>
    <button id="ntfcbtnp">Send Notifications</button>
    <p id="kyctextfld">All Notifications</p>
             <div id ="kncusdet">
                <div>Date & Time</div>
                <div>Message</div>
                <div>To</div>
                <div>Seen By</div>
              </div>
  `;

    // Add event listener to the dynamically added button
    document.getElementById("ntfcbtnp").onclick =
      function showNotificationDialog() {
        // Declare the dialogHTML variable within this scope
        const dialogHTML = `
      <div id="dialog" class="dialog">
        <label for="notification-input">Enter your notification:</label><br>
        <input type="text" id="notification-input" placeholder="Type your message here" /><br>
        <button id="submit-btn">Submit</button>
      </div>
    `;
        // Append the dialog to the main content
        document.getElementById("main-content").innerHTML += dialogHTML;

        // Add functionality to the submit button
        document.getElementById("submit-btn").onclick =
          function submitNotification() {
            const notification =
              document.getElementById("notification-input").value;
            alert("Notification submitted: " + notification);
            // Remove the dialog after submission
            document.getElementById("dialog").remove();
          };
      };
  };
