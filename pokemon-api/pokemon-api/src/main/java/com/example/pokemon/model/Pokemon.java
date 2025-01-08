package com.example.pokemon.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import java.math.BigDecimal;

@Entity
public class Pokemon {
    
    @Id
    private Integer nationalNumber;
    
    @Column(length = 3)
    private String gen;
    
    @Column(name = "english_name")
    private String englishName;
    
    @Column(name = "primary_type")
    private String primaryType;
    
    @Column(name = "secondary_type")
    private String secondaryType;
    
    private String classification;
    
    @Column(name = "percent_male", precision = 5, scale = 2)
    private BigDecimal percentMale;
    
    @Column(name = "percent_female", precision = 5, scale = 2)
    private BigDecimal percentFemale;
    
    @Column(name = "height_m", precision = 4, scale = 1)
    private BigDecimal heightM;
    
    @Column(name = "weight_kg", precision = 5, scale = 1)
    private BigDecimal weightKg;
    
    @Column(name = "capture_rate")
    private Integer captureRate;
    
    private Integer hp;
    private Integer attack;
    private Integer defense;
    private Integer speed;
    
    @Column(name = "abilities_0")
    private String abilities0;
    
    @Column(name = "abilities_1")
    private String abilities1;
    
    @Column(name = "abilities_special")
    private String abilitiesSpecial;
    
    @Column(name = "is_sublegendary")
    private Integer isSublegendary;
    
    @Column(name = "is_legendary")
    private Integer isLegendary;
    
    @Column(name = "is_mythical")
    private Integer isMythical;
    
    @Column(name = "evochain_0")
    private String evochain0;
    
    @Column(name = "evochain_2")
    private String evochain2;
    
    @Column(name = "evochain_4")
    private String evochain4;
    
    @Column(name = "mega_evolution")
    private String megaEvolution;
    
    @Column(columnDefinition = "TEXT")
    private String description;

    // Default constructor
    public Pokemon() {
    }

    // Getters and Setters
    public Integer getNationalNumber() {
        return nationalNumber;
    }

    public void setNationalNumber(Integer nationalNumber) {
        this.nationalNumber = nationalNumber;
    }

    public String getGen() {
        return gen;
    }

    public void setGen(String gen) {
        this.gen = gen;
    }

    public String getEnglishName() {
        return englishName;
    }

    public void setEnglishName(String englishName) {
        this.englishName = englishName;
    }

    public String getPrimaryType() {
        return primaryType;
    }

    public void setPrimaryType(String primaryType) {
        this.primaryType = primaryType;
    }

    public String getSecondaryType() {
        return secondaryType;
    }

    public void setSecondaryType(String secondaryType) {
        this.secondaryType = secondaryType;
    }

    public String getClassification() {
        return classification;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public BigDecimal getPercentMale() {
        return percentMale;
    }

    public void setPercentMale(BigDecimal percentMale) {
        this.percentMale = percentMale;
    }

    public BigDecimal getPercentFemale() {
        return percentFemale;
    }

    public void setPercentFemale(BigDecimal percentFemale) {
        this.percentFemale = percentFemale;
    }

    public BigDecimal getHeightM() {
        return heightM;
    }

    public void setHeightM(BigDecimal heightM) {
        this.heightM = heightM;
    }

    public BigDecimal getWeightKg() {
        return weightKg;
    }

    public void setWeightKg(BigDecimal weightKg) {
        this.weightKg = weightKg;
    }

    public Integer getCaptureRate() {
        return captureRate;
    }

    public void setCaptureRate(Integer captureRate) {
        this.captureRate = captureRate;
    }

    public Integer getHp() {
        return hp;
    }

    public void setHp(Integer hp) {
        this.hp = hp;
    }

    public Integer getAttack() {
        return attack;
    }

    public void setAttack(Integer attack) {
        this.attack = attack;
    }

    public Integer getDefense() {
        return defense;
    }

    public void setDefense(Integer defense) {
        this.defense = defense;
    }

    public Integer getSpeed() {
        return speed;
    }

    public void setSpeed(Integer speed) {
        this.speed = speed;
    }

    public String getAbilities0() {
        return abilities0;
    }

    public void setAbilities0(String abilities0) {
        this.abilities0 = abilities0;
    }

    public String getAbilities1() {
        return abilities1;
    }

    public void setAbilities1(String abilities1) {
        this.abilities1 = abilities1;
    }

    public String getAbilitiesSpecial() {
        return abilitiesSpecial;
    }

    public void setAbilitiesSpecial(String abilitiesSpecial) {
        this.abilitiesSpecial = abilitiesSpecial;
    }

    public Integer getIsSublegendary() {
        return isSublegendary;
    }

    public void setIsSublegendary(Integer isSublegendary) {
        this.isSublegendary = isSublegendary;
    }

    public Integer getIsLegendary() {
        return isLegendary;
    }

    public void setIsLegendary(Integer isLegendary) {
        this.isLegendary = isLegendary;
    }

    public Integer getIsMythical() {
        return isMythical;
    }

    public void setIsMythical(Integer isMythical) {
        this.isMythical = isMythical;
    }

    public String getEvochain0() {
        return evochain0;
    }

    public void setEvochain0(String evochain0) {
        this.evochain0 = evochain0;
    }

    public String getEvochain2() {
        return evochain2;
    }

    public void setEvochain2(String evochain2) {
        this.evochain2 = evochain2;
    }

    public String getEvochain4() {
        return evochain4;
    }

    public void setEvochain4(String evochain4) {
        this.evochain4 = evochain4;
    }

    public String getMegaEvolution() {
        return megaEvolution;
    }

    public void setMegaEvolution(String megaEvolution) {
        this.megaEvolution = megaEvolution;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}