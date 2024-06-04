var tempCount = 0;

const globalPortConfig = () => {
    var protocol = document.getElementById("protocol").value;
    var port = document.getElementById("port").value;
    var config = "";
    var commands = "";
    switch (protocol) {
        case "tcp":
            config =
                `module(load="imtcp")<br/>input(type="imtcp" port="` + port + `")`;
            commands = `# semanage port -a -t syslogd_port_t -p ` + protocol + ` ` + port + `<br /># firewall-cmd --zone=zone --permanent --add-port=` + port + `/` + protocol + `<br /># firewall-cmd --reload`;
            final = `<h6><u>Run below commands as root</u></h6>` + commands + `<br/><br/><h6><u>Please Add/uncomment below configuration</u></h6>` + config;
            break;
        case "udp":
            config =
                `module(load="imudp")<br />input(type="imudp" port="` + port + `")`;
            commands = `# semanage port -a -t syslogd_port_t -p ` + protocol + ` ` + port + `<br /># firewall-cmd --zone=zone --permanent --add-port=` + port + `/` + protocol + `<br /># firewall-cmd --reload`;
            final = `<h6><u>Run below commands as root</u></h6>` + commands + `<br/><br/><h6><u>Please Add/uncomment below configuration</u></h6>` + config;
            break;
        case "any":
            config =
                `module(load="imtcp")<br />input(type="imtcp" port="` +
                port +
                `")<br />module(load="imudp")<br />input(type="imudp" port="` +
                port +
                `")`;
            commands = `# semanage port -a -t syslogd_port_t -p tcp ` + port + `<br /># semanage port -a -t syslogd_port_t -p udp ` + port + `<br /># firewall-cmd --zone=zone --permanent --add-port=` + port + `/tcp<br /># firewall-cmd --zone=zone --permanent --add-port=` + port + `/udp<br /># firewall-cmd --reload`;
            final = `<h6><u>Run below commands as root</u></h6>` + commands + `<br/><br/><h6><u>Please Add/uncomment below configuration</u></h6>` + config;
            break;
        default:
            final = `No configuration proposed`;
    }
    document.getElementById("configOutput").innerHTML = final;
};

const toggleTemplate = () => {
    var template = document.getElementById("template");
    if(template.style.display === "none") {
        template.style.display = "block";
        document.getElementById("btnTemplate").innerHTML = "Don't create template"
    }
    else {
        template.style.display = "none";
        document.getElementById("btnTemplate").innerHTML = "Create template"
    }
}

const initScript = () => {
    var template = document.getElementById("template");
    template.style.display = "none";
}

const addTemp = () => {
    console.log(this.tempCount);
    const mainDiv = document.getElementById("moreTemp");
    const newDiv1 = document.createElement('div');
    newDiv1.className = "input-group input-group mb-3";
    const nameLabel = document.createElement("p");
    nameLabel.className = "col-md-2";
    nameLabel.id = "inputGroup-sizing-sm";
    nameLabel.innerHTML = "Template name"
    const nameBox = document.createElement("input");
    nameBox.type = "text";
    nameBox.id = `tempName-${this.tempCount}`;
    nameBox.className = "form-control col-md-8";
    nameBox.ariaLabel = "Sizing example input";
    nameBox.placeholder = "Enter template name";

    const newDiv2 = document.createElement('div');
    newDiv2.className = "input-group input-group mb-3";
    const pathLabel = document.createElement("p");
    pathLabel.className = "col-md-2";
    pathLabel.id = "inputGroup-sizing-sm";
    pathLabel.innerHTML = "Log file path"
    const pathBox = document.createElement("input");
    pathBox.type = "text";
    pathBox.id = `tempPath-${this.tempCount}`;
    pathBox.className = "form-control col-md-8";
    pathBox.ariaLabel = "Sizing example input";
    pathBox.placeholder = "Example: /var/log/hostname/source-ip/programm-name.log";
    newDiv1.appendChild(nameLabel);
    newDiv1.appendChild(nameBox);
    newDiv2.appendChild(pathLabel);
    newDiv2.appendChild(pathBox);
    mainDiv.appendChild(newDiv1);
    mainDiv.appendChild(newDiv2);
    this.tempCount++;
    
}