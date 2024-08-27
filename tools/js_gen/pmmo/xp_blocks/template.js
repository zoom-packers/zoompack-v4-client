class Template {
    override = true;
    isTagFor = [];
    xp_values = {};
    requirements = {};

    static build() {
        return new Template();
    }

    withOverride(override) {
        this.override = override;
        return this;
    }

    withTagFor(tag) {
        this.isTagFor.push(tag);
        return this;
    }

    withBreakXpValue(skill, value) {
        if (this.xp_values.BLOCK_BREAK === undefined) {
            this.xp_values.BLOCK_BREAK = {};
        }
        this.xp_values.BLOCK_BREAK[skill] = value;
        return this;
    }

    withPlaceXpValue(skill, value) {
        if (this.xp_values.BLOCK_PLACE === undefined) {
            this.xp_values.BLOCK_PLACE = {};
        }
        this.xp_values.BLOCK_PLACE[skill] = value;
        return this;
    }

    withBreakRequirement(skill, value) {
        if (this.requirements.BREAK === undefined) {
            this.requirements.BREAK = {};
        }
        this.requirements.BREAK[skill] = value;
        return this;
    }
}

module.exports = {
    Template
}
