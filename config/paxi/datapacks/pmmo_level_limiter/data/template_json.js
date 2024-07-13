function armor (value) {
    return {
        requirements: {
            WEAR: {
                endurance: value
            }
        }
    }
}

function sword (value) {
    return {
        requirements: {
            WEAPON: {
                swordsmanship: value
            },
            WEAR: {
                swordsmanship: value
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
                swordsmanship: value
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

function generalUse(skill, value) {
    return {
        requirements: {
            WEAR: {
                [skill]: value
            },
            INTERACT: {
                [skill]: value
            },
            PLACE: {
                [skill]: value
            },
            USE: {
                [skill]: value
            }
        }
    }
}

function place(skill, value) {
    return {
        requirements: {
            PLACE: {
                [skill]: value
            }
        }
    }
}

module.exports = {
    armor,
    sword,
    axe,
    tool,
    mount,
    use,
    generalUse,
    place
}
