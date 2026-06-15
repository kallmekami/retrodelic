"""
KAMIOPS — Retro CRT-style portfolio
Flask application
"""

from flask import Flask, render_template

app = Flask(__name__)

# ──────────────────────────────────────────────
# DATA — edit this to update resume content
# ──────────────────────────────────────────────

EXPERIENCE = [
    {
        "company": "SERVER.IR",
        "role": "Linux System Administrator",
        "period": "Jun 2026 — Present",
        "desc": (
            "Managing Linux-based hosting and server environments. Working with "
            "cPanel/WHM, Plesk, and DirectAdmin. Managing SSL, DNS, mail, and "
            "hosting services. Monitoring infrastructure with Zabbix and Grafana. "
            "Working with OpenStack environments and cloud infrastructure operations."
        ),
        "tags": ["Linux", "cPanel", "Plesk", "DirectAdmin", "OpenStack", "Zabbix"],
    },
    {
        "company": "ALMAS HOST",
        "role": "Linux System Administrator",
        "period": "Jul 2024 — Jun 2026",
        "desc": (
            "Managed Linux hosting with cPanel/WHM and WHMCS. SSL installation, "
            "DNS, Apache/Nginx troubleshooting, email services. Handled hosting "
            "support and technical requests for clients."
        ),
        "tags": ["Linux", "cPanel", "Nginx", "Bash", "WHMCS", "Docker"],
    },
    {
        "company": "TRADER4",
        "role": "Junior DevOps Engineer (Internship)",
        "period": "Apr 2022 — Mar 2023",
        "desc": (
            "Docker and Kubernetes environments. GitLab CI/CD pipelines. "
            "Managed Deployments, Services, Ingress, ConfigMaps, and Secrets."
        ),
        "tags": ["K8s", "Docker", "GitLab CI", "Helm"],
    },
    {
        "company": "ASIATECH",
        "role": "Linux SysAdmin Intern",
        "period": "Jun 2019 — Sep 2019",
        "desc": (
            "Linux server administration fundamentals. Apache, Nginx, MySQL. "
            "Troubleshooting and maintenance in hosting environments."
        ),
        "tags": ["Linux", "Apache", "MySQL"],
    },
]

EDUCATION = [
    {
        "school": "AZAD UNIVERSITY",
        "degree": "B.Sc. Computer Engineering",
        "period": "2021 — In Progress · Rasht",
        "desc": (
            "Currently pursuing undergraduate degree in Computer Engineering "
            "while working full-time in Linux administration and DevOps."
        ),
        "tags": ["CS", "Networks", "Systems"],
    },
]

LANGUAGES = "Persian — Native&nbsp;&nbsp;|&nbsp;&nbsp;English — Professional"

CONTACT = {
    "email": "kamyarzrfr2207@gmail.com",
    "linkedin_url": "https://linkedin.com/in/kamyar-zarefar",
    "linkedin_label": "kamyar zarefar",
    "phone_href": "+989116941724",
    "phone_display": "+98 911 694 1724",
    "location": "Rasht, Gilan, Iran",
}

# Terminal "cat" command output shown on the STACK page
SKILL_DATA = [
    {
        "cmd": "cat /etc/skills/containers",
        "out": [
            "Docker",
            "Kubernetes",
            "Helm",
            "Pods / Deployments / Services",
            "Ingress / ConfigMaps / Secrets",
        ],
    },
    {
        "cmd": "cat /etc/skills/cicd",
        "out": ["GitLab CI/CD", "Ansible", "Bash Scripting", "N8N", "Git"],
    },
    {
        "cmd": "cat /etc/skills/hosting",
        "out": ["Linux Admin", "cPanel / WHM", "Plesk", "DirectAdmin", "WHMCS", "Apache / Nginx"],
    },
    {
        "cmd": "cat /etc/skills/cloud",
        "out": ["OpenStack", "VMware"],
    },
    {
        "cmd": "cat /etc/skills/monitoring",
        "out": ["Prometheus", "Grafana", "Zabbix"],
    },
    {
        "cmd": "cat /etc/skills/network",
        "out": ["MikroTik", "Cisco CCNA", "HAProxy", "Keepalived", "MySQL"],
    },
]


# ──────────────────────────────────────────────
# ROUTES
# ──────────────────────────────────────────────

@app.route("/")
def index():
    return render_template(
        "index.html",
        experience=EXPERIENCE,
        education=EDUCATION,
        languages=LANGUAGES,
        contact=CONTACT,
        skill_data=SKILL_DATA,
    )


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
