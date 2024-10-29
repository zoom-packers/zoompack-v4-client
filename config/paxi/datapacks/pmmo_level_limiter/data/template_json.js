function armor (value) {
    return {
        requirements: {
            WEAR: {
                combat: value
            }
        }
    }
}

function sword (value) {
    return {
        requirements: {
            WEAPON: {
                swordsmanship: value,
            },
            WEAR: {
                wear: 0
            },
            TOOL: {
                farming : 0
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
            USE: {
                woodcutting: value
            },
            WEAR: {
                wear: 0
            },
            INTERACT: {
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
                wear: 0
            },
            WEAPON: {
                combat: 0
            },
        }
    }
}

function offhand(value) {
    return {
        requirements: {
            WEAR: {
                magic: value
            }
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

function block(skill, value) {
    return {
        requirements: {
            PLACE: {
                [skill]: value
            },
            INTERACT: {
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
    place,
    offhand,
    block
}
