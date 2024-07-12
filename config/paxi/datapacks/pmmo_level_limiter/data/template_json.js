function armor (value) {
    return {
        requirements: {
            WEAR: {
                endurance: value
            }
        }
    }
}

function weapon (value) {
    return {
        requirements: {
            WEAPON: {
                combat: value
            },
            WEAR: {
                combat: value
            }
        }
    }
}

function axe (value) {
    return {
        requirements: {
            TOOL: {
                woodcutting: value
            },
            WEAPON: {
                combat: value
            },
            WEAR: {
                woodcutting: value
            }
        }
    }
}

function tool(skill, value) {
    return {
        requirements: {
            TOOL: {
                [skill]: value
            },
            WEAR: {
                [skill]: value
            },
            WEAPON: {
                combat: 0
            },
        }
    }
}

function mount(skill, value) {
    return {
        requirements: {
            RIDE: {
                [skill]: value
            }
        }
    }
}

function use(skill, value) {
    return {
        requirements: {
            USE: {
                [skill]: value
            }
        }
    }
}

module.exports = {
    armor,
    weapon,
    axe,
    tool,
    mount,
    use
}
