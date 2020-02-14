#!/bin/bash

# ---------------------- functions --------------------
function split_string () {

    # $1 is string
    # $2 is delimiter

    IFS=$2 # set delimiter
    read -ra splitArray <<< $1 # string is read into an array as tokens separated by IFS
    IFS=' ' # reset to default value after usage
    split_string_return=$splitArray
}

function array_to_pascal_case () {

    # $1 is array of string

    # Upper case each element of the array
    local array=("$@")
    local pascalCaseString=""
    for i in "${!array[@]}"; do # access each element of array
        local value="${array[$i]}"
        local upperCaseValue=$(tr '[:lower:]' '[:upper:]' <<< ${value:0:1})${value:1}
        pascalCaseString=${pascalCaseString}${upperCaseValue}
    done

    array_to_pascal_case_return=$pascalCaseString
}

function delimited_string_to_pascal_case () {
    local delimited_string=$1
    local delimiter=$2

    split_string $delimited_string $delimiter
    array_to_pascal_case ${split_string_return[@]}

    echo "$array_to_pascal_case_return"
}

function import_enums () {
    local file=$1

    enumsUniqClassName=($(echo "${enumsClassName[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' '))
    enumsUniqPath=($(echo "${enumsPath[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' '))
    for i in "${!enumsUniqClassName[@]}"; do
        echo "import { ${enumsUniqClassName[$i]} } from '../../common/enums/${enumsUniqPath[$i]}.enum';" >> $file
    done
}

function import_foreigns_class () {
    local file=$1

    foreignKeysUniqClassName=($(echo "${foreignKeysClassName[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' '))
    foreignKeysUniqPath=($(echo "${foreignKeysPath[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' '))
    for i in "${!foreignKeysUniqClassName[@]}"; do 
        echo "import { "${foreignKeysUniqClassName[$i]}" } from '../../"${foreignKeysUniqPath[$i]}"/interfaces/${foreignKeysUniqPath[$i]}.interface';"  >> $file
    done
}

# ---------------------- end --------------------
 
# $1 = collection name
collectionName=$1

# generate object names
className="$(delimited_string_to_pascal_case $collectionName "-")"

schemaName=$className"Schema"
controllerName=$className"Controller"
serviceName=$className"Service"
moduleName=$className"Module"
modelVarName=$(tr '[:upper:]' '[:lower:]' <<< ${className:0:1})${className:1}"Model"
serviceVarName=$(tr '[:upper:]' '[:lower:]' <<< ${className:0:1})${className:1}"Service"

echo $className
echo $controllerName
echo $modelVarName




echo "Steps : "
echo "1° Simple properties like string, number[] ..."
echo "2° Foreign keys"
echo "3° Enums"
echo ""




echo ""
echo "--------- 1° Simple properties ----------"
echo ""

# prompt properties
declare -a propertyNames
declare -a propertyTypes

continueToAsk=true
echo ""
echo "Do you want to add simple properties ? (y/n)"
read wantToAdd
if [ $wantToAdd = "y" ]; then
    while [ $continueToAsk = true ]
    do
        echo ""
        echo "property name : (propertyName or nothing to skip)"
        read propertyName
        if [ -z $propertyName ]; then # user want to stop adding properties
            continueToAsk=false            
        else
            propertyNames+=($propertyName)
            echo ""
            echo "property type : (string, number[], boolean, Date[] ...)"
            read propertyType
            propertyTypes+=($propertyType)
        fi
        echo ""
    done
else
    continueToAsk=false
fi

echo property names :
printf '%s\n' "${propertyNames[@]}"

echo property types :
printf '%s\n' "${propertyTypes[@]}"




echo ""
echo "--------- 2° Foreign keys ----------"
echo ""

# prompt foreign keys
declare -a foreignKeys

continueToAsk=true
echo "Do you want to add foreign keys ? (y/n)"
read wantToAdd
if [ $wantToAdd = "y" ]; then
    while [ $continueToAsk = true ]
    do
        echo ""
        echo "foreign key type : (foreign-class-name or foreign-class-name[] or nothing to skip)"
        read foreignKey
        if [ -z $foreignKey ]; then # user want to stop adding properties
            continueToAsk=false            
        else
            foreignKeys+=($foreignKey)
        fi
        echo ""
    done
else
    continueToAsk=false
fi


# split foreign keys properties into three arrays
declare -a foreignKeysPath
declare -a foreignKeysClassName
declare -a foreignKeysType
declare -a foreignKeysVarName

for i in "${!foreignKeys[@]}"; do

    foreignKey=${foreignKeys[$i]}

    if [ ${foreignKey: -2} = "[]" ]; then # if is array
        foreignKeyWthBracket=$foreignKey
        for run in {1..2}; do foreignKeyWthBracket=${foreignKeyWthBracket%?}; done # change foreign-key[] into foreign-key

        # foreign key path
        foreignKeysPath+=($foreignKeyWthBracket)
        
        # foreign key class name
        foreignKeyClassName="$(delimited_string_to_pascal_case $foreignKeyWthBracket "-")"
        foreignKeysClassName+=($foreignKeyClassName)

        # foreign key var name
        foreignKeyVarName=$(tr '[:upper:]' '[:lower:]' <<< ${foreignKeyClassName:0:1})${foreignKeyClassName:1}"Ids"
        foreignKeysVarName+=($foreignKeyVarName)
        
    else
        # foreign key path
        foreignKeysPath+=($foreignKey)

        # foreign key class name
        foreignKeyClassName="$(delimited_string_to_pascal_case $foreignKey "-")"
        foreignKeysClassName+=($foreignKeyClassName)

        # foreign key var name
        foreignKeyVarName=$(tr '[:upper:]' '[:lower:]' <<< ${foreignKeyClassName:0:1})${foreignKeyClassName:1}"Id"
        foreignKeysVarName+=($foreignKeyVarName)
    fi

    # foreign key type name
    foreignKeyType="$(delimited_string_to_pascal_case $foreignKey "-")"
    foreignKeysType+=($foreignKeyType)

done

echo foreign keys :
printf '%s\n' "${foreignKeys[@]}"
echo ""
echo foreign keys class name :
printf '%s\n' "${foreignKeysClassName[@]}"
echo ""
echo "foreign keys type :"
printf '%s\n' "${foreignKeysType[@]}"
echo ""
echo foreign keys path :
printf '%s\n' "${foreignKeysPath[@]}"
echo ""
echo foreign keys var name :
printf '%s\n' "${foreignKeysVarName[@]}"




echo ""
echo "--------- 3° Enums ----------"
echo ""

# prompt foreign keys
declare -a enums

continueToAsk=true
echo ""
echo "Do you want to add enum properties ? (y/n)"
read wantToAdd
if [ $wantToAdd = "y" ]; then
    while [ $continueToAsk = true ]
    do
        echo ""
        echo "enum type : (enum-name or enum-name[] or stop)"
        read enum
        if [ -z $enum ]; then # user want to stop adding properties
            continueToAsk=false            
        else
            enums+=($enum)
        fi
    done
else
    continueToAsk=false
fi


# split foreign keys properties into three arrays
declare -a enumsPath
declare -a enumsClassName
declare -a enumsVarName

for i in "${!enums[@]}"; do

    enum=${enums[$i]}

    if [ ${enum: -2} = "[]" ]; then # if is array
        enumWthBracket=$enum
        for run in {1..2}; do enumWthBracket=${enumWthBracket%?}; done # change foreign-key[] into foreign-key

        # path
        enumsPath+=($enumWthBracket)
        
        # class name
        enumClassName="$(delimited_string_to_pascal_case $enumWthBracket "-")"
        enumsClassName+=($enumClassName)

        # var name
        enumVarName=$(tr '[:upper:]' '[:lower:]' <<< ${enumClassName:0:1})${enumClassName:1}
        enumsVarName+=($enumVarName)
        
    else
        # path
        enumsPath+=($enum)

        # class name
        enumClassName="$(delimited_string_to_pascal_case $enum "-")"
        enumsClassName+=($enumClassName)

        # var name
        enumVarName=$(tr '[:upper:]' '[:lower:]' <<< ${enumClassName:0:1})${enumClassName:1}
        enumsVarName+=($enumVarName)
    fi

done


echo ""
echo enums prompted :
printf '%s\n' "${enums[@]}"
echo length : ${#enums[@]}
echo ""
echo enums path :
printf '%s\n' "${enumsPath[@]}"
echo ""
echo enums class name :
printf '%s\n' "${enumsClassName[@]}"
echo ""
echo enums var name :
printf '%s\n' "${enumsVarName[@]}"




# generate from nest 
nest g module $collectionName
nest g controller $collectionName
nest g service $collectionName

# get generated files
module=src/$collectionName/$collectionName.module.ts
controller=src/$collectionName/$collectionName.controller.ts
service=src/$collectionName/$collectionName.service.ts

# empty files
> $module
> $controller
> $service





# fill module

echo "import { Module } from '@nestjs/common';"                                                     >> $module
echo ""                                                                                             >> $module
echo "import { "$controllerName" } from './"$collectionName".controller';"                                       >> $module
echo "import { "$serviceName" } from './"$collectionName".service';"                                             >> $module
echo "import { MongooseModule } from '@nestjs/mongoose';"                                           >> $module
echo "import { "$schemaName" } from './schemas/"$collectionName".schema';"                                       >> $module
echo ""                                                                                             >> $module
echo "@Module({"                                                                                    >> $module
echo "    imports: ["                                                                               >> $module
echo "        MongooseModule.forFeature([{ name: '"$className"', schema: "$schemaName" }]),"        >> $module
echo "    ],"                                                                                       >> $module
echo "    controllers: ["$controllerName"],"                                                        >> $module
echo "    providers: ["$serviceName"],"                                                             >> $module
echo "})"                                                                                           >> $module
echo "export class "$moduleName" {}"                                                                >> $module





# fill service

echo "import { Injectable } from '@nestjs/common';"                                                                                     >> $service
echo "import { InjectModel } from '@nestjs/mongoose';"                                                                                  >> $service
echo "import { "$className" } from './interfaces/"$collectionName".interface';"                                                         >> $service
echo "import { Model } from 'mongoose';"                                                                                                >> $service
echo "import { Create"$className"Dto } from './dto/create-"$collectionName".dto';"                                                      >> $service
echo "import { Update"$className"Dto } from './dto/update-"$collectionName".dto';"                                                      >> $service
echo ""                                                                                                                                 >> $service
echo "@Injectable()"                                                                                                                    >> $service
echo "export class "$serviceName" {"                                                                                                    >> $service
echo ""                                                                                                                                 >> $service
echo "    constructor("                                                                                                                 >> $service
echo "        @InjectModel('"$className"') private readonly "$modelVarName": Model<"$className">,"                                      >> $service
echo "    ) {}"                                                                                                                         >> $service
echo ""                                                                                                                                 >> $service
echo "    async create(create"$className"Dto: Create"$className"Dto): Promise<"$className"> {"                                          >> $service
echo "        const created"$className" = new this."$modelVarName"(create"$className"Dto);"                                             >> $service
echo "        return created"$className".save();"                                                                                       >> $service
echo "    }"                                                                                                                            >> $service
echo ""                                                                                                                                 >> $service
echo "    async update(id: string, update"$className"Dto: Update"$className"Dto) {"                                                     >> $service
echo "        return this."$modelVarName".updateOne({ _id: id }, { ...update"$className"Dto, updatedAt: new Date()});"                  >> $service
echo "    }"                                                                                                                            >> $service
echo ""                                                                                                                                 >> $service
echo "    async delete(id: string) {"                                                                                                   >> $service
echo "        return this."$modelVarName".deleteOne({ _id: id });"                                                                      >> $service
echo "    }"                                                                                                                            >> $service
echo ""                                                                                                                                 >> $service
echo "    async find(id: string): Promise<"$className"> {"                                                                              >> $service
echo "        return this."$modelVarName".findOne({ _id: id }).exec();"                                                                 >> $service
echo "    }"                                                                                                                            >> $service
echo ""                                                                                                                                 >> $service
echo "    async findAll(): Promise<"$className"[]> {"                                                                                   >> $service
echo "        return this."$modelVarName".find().exec();"                                                                               >> $service
echo "    }"                                                                                                                            >> $service
echo "}"                                                                                                                                >> $service





# fill controller

echo "import { Controller, Get, Param, Injectable, Query, Post, Body, ValidationPipe, UsePipes, Put, Delete, UseGuards } from '@nestjs/common';"    >> $controller
echo "import { "$className" } from './interfaces/"$collectionName".interface';"                                                                     >> $controller
echo "import { "$serviceName" } from './"$collectionName".service';"                                                                                >> $controller
echo "import { Create"$className"Dto } from './dto/create-"$collectionName".dto';"                                                                  >> $controller
echo "import { Update"$className"Dto } from './dto/update-"$collectionName".dto';"                                                                  >> $controller
echo "import { ApiUseTags } from '@nestjs/swagger';"                                                                                                >> $controller
echo ""                                                                                                                                             >> $controller
echo "@ApiUseTags('"$collectionName"')"                                                                                                             >> $controller
echo "@Controller('"$collectionName"')"                                                                                                             >> $controller
echo "export class "$controllerName" {"                                                                                                             >> $controller
echo ""                                                                                                                                             >> $controller
echo "    constructor(private readonly "$serviceVarName": "$serviceName") {}"                                                                       >> $controller
echo ""                                                                                                                                             >> $controller
echo "    @Post()"                                                                                                                                  >> $controller
echo "    async create(@Body() create"$className"Dto: Create"$className"Dto): Promise<"$className"> {"                                              >> $controller
echo "        return this."$serviceVarName".create(create"$className"Dto);"                                                                         >> $controller
echo "    }"                                                                                                                                        >> $controller
echo ""                                                                                                                                             >> $controller
echo "    @Get(':id')"                                                                                                                              >> $controller
echo "    async find(@Param('id') id: string) {"                                                                                                    >> $controller
echo "       return this."$serviceVarName".find(id);"                                                                                               >> $controller
echo "    }"                                                                                                                                        >> $controller
echo ""                                                                                                                                             >> $controller
echo "    @Put(':id')"                                                                                                                              >> $controller
echo "    async update(@Param('id') id: string, @Body() update"$className"Dto: Update"$className"Dto) {"                                            >> $controller
echo "        return this."$serviceVarName".update(id, update"$className"Dto);"                                                                     >> $controller
echo "    }"                                                                                                                                        >> $controller
echo ""                                                                                                                                             >> $controller
echo "    @Delete(':id')"                                                                                                                           >> $controller
echo "    async delete(@Param('id') id: string) {"                                                                                                  >> $controller
echo "        return this."$serviceVarName".delete(id);"                                                                                            >> $controller
echo "    }"                                                                                                                                        >> $controller
echo ""                                                                                                                                             >> $controller
echo "    @Get()"                                                                                                                                   >> $controller
echo "    async findAll(): Promise<"$className"[]> {"                                                                                               >> $controller
echo "        return this."$serviceVarName".findAll();"                                                                                             >> $controller
echo "    }"                                                                                                                                        >> $controller
echo "}"                                                                                                                                            >> $controller




# generate enums

echo "generate enums ..."
for i in "${!enumsClassName[@]}"; do
    enumPath=${enumsPath[$i]}
    enumClassName=${enumsClassName[$i]}
    
    mkdir -p src/common/enums
    enumFile=src/common/enums/$enumPath.enum.ts

    if test ! -f "$enumFile"; then
        echo "export enum $enumClassName {"                         >> $enumFile
        echo ""                                                     >> $enumFile
        echo "}"                                                    >> $enumFile
    fi
done




# generate interface
echo "generate interface ..."
mkdir src/$collectionName/interfaces/
touch src/$collectionName/interfaces/$collectionName.interface.ts

interface=src/$collectionName/interfaces/$collectionName.interface.ts

echo "import * as mongoose from 'mongoose';"                                                                                                        >> $interface

import_foreigns_class $interface
import_enums $interface

echo ""                                                                                                                                             >> $interface
echo "export interface "$className" extends mongoose.Document {"                                                                                    >> $interface

# generate interface simple properties
for i in "${!propertyNames[@]}"; do
    echo "    "${propertyNames[$i]}": "${propertyTypes[$i]}";"                                                                                      >> $interface
done

# generate interface foreign keys
for i in "${!foreignKeysClassName[@]}"; do
    nudeForeignKeyVarName=${foreignKeysVarName[$i]}
    foreignKeyVarName=""
    if [ ${foreignKeysType[$i]: -2} = "[]" ]; then
        for run in {1..3}; do nudeForeignKeyVarName=${nudeForeignKeyVarName%?}; done # remove "Ids" part of the string
        foreignKeyVarName=$nudeForeignKeyVarName"List"
    else
        for run in {1..2}; do nudeForeignKeyVarName=${nudeForeignKeyVarName%?}; done # remove "Id" part of the string
        foreignKeyVarName=$nudeForeignKeyVarName
    fi
    echo "    "$foreignKeyVarName": "${foreignKeysType[$i]}";"                                                                              >> $interface
done

# generate interface enum properties
for i in "${!enumsClassName[@]}"; do
    enum=${enums[$i]}
    enumClassName=${enumsClassName[$i]}
    if [[ ${enum: -2} = "[]" ]]; then # is array ?
        echo "    "${enumsVarName[$i]}"List: "$enumClassName"[];"                                                                           >> $interface
    else
        echo "    "${enumsVarName[$i]}": "$enumClassName";"                                                                                 >> $interface
    fi
done

echo "}"                                                                                                                                    >> $interface




function generate_dto () {
    dtoType=$1 # "create" or "update"
    dtoTypeUpperCase=$(tr '[:lower:]' '[:upper:]' <<< ${dtoType:0:1})${dtoType:1}

    # generate dto folder
    echo "generate $dtoType dto ..."
    mkdir -p src/$collectionName/dto

    dto=src/$collectionName/dto/${dtoType}-${collectionName}.dto.ts

    echo "import { IsNumber, IsString, IsBoolean, IsDateString, IsEnum } from 'class-validator';"               >> $dto
    echo "import { ApiModelProperty } from '@nestjs/swagger';"                                                  >> $dto

    # import enum util method
    if [ ${#enums[@]} -gt 0 ]; then echo "import { enumToArray } from '../../common/utils/utils';"                >> $dto; fi  

    import_enums $dto

    echo ""                                                                                                     >> $dto
    echo "export class ${dtoTypeUpperCase}${className}Dto {"                                                    >> $dto

    # generate dto simple properties
    for i in "${!propertyNames[@]}"; do
        echo ""                                                                         >> $dto
        propertyType=${propertyTypes[$i]}

        case $propertyType in
            "string")
                echo "    @IsString()"                                                  >> $dto
                echo "    @ApiModelProperty()"                                          >> $dto
                ;;
            "string[]")
                echo "    @IsString({ each: true })"                                    >> $dto
                echo "    @ApiModelProperty({ type: [String] })"                        >> $dto
                ;;
            "boolean")
                echo "    @IsBoolean()"                                                 >> $dto
                echo "    @ApiModelProperty()"                                          >> $dto
                ;;
            "boolean[]")
                echo "    @IsBoolean({ each: true })"                                   >> $dto
                echo "    @ApiModelProperty({ type: [Boolean] })"                       >> $dto
                ;;
            "number")
                echo "    @IsNumber()"                                                  >> $dto
                echo "    @ApiModelProperty()"                                          >> $dto
                ;;
            "number[]")
                echo "    @IsNumber({}, { each: true })"                                >> $dto
                echo "    @ApiModelProperty({ type: [Number] })"                        >> $dto
                ;;
            "Date")
                echo "    @IsDateString()"                                              >> $dto
                echo "    @ApiModelProperty({ type: String, format: 'date-time'})"      >> $dto
                ;;
            "Date[]")
                echo "    @IsDateString({ each: true })"                                >> $dto
                echo "    @ApiModelProperty({ type: [String], format: 'date-time' })"   >> $dto
                ;;
            *)
        esac

        echo "    readonly "${propertyNames[$i]}": "${propertyTypes[$i]}";"             >> $dto
    done

    # generate dto foreign keys
    for i in "${!foreignKeysClassName[@]}"; do
        if [ ${foreignKeysType[$i]: -2} = "[]" ]; then # array foreign key
            echo ""                                                                         >> $dto
            echo "    @IsString({ each: true })"                                            >> $dto
            echo "    @ApiModelProperty({ type: [String] })"                                >> $dto
            echo "    readonly "${foreignKeysVarName[$i]}": string[];"                      >> $dto
        else # simple foreign key
            echo ""                                                                         >> $dto
            echo "    @IsString()"                                                          >> $dto
            echo "    @ApiModelProperty()"                                                  >> $dto
            echo "    readonly "${foreignKeysVarName[$i]}": string;"                        >> $dto
        fi
    done

    # generate dto enum properties
    for i in "${!enumsClassName[@]}"; do

        enumClassName=${enumsClassName[$i]}
        enumVarName=${enumsVarName[$i]}

        if [ ${enums[$i]: -2} = "[]" ]; then # array foreign key
            echo ""                                                                                                     >> $dto
            echo "    @IsEnum($enumClassName, { each: true })"                                                          >> $dto
            echo "    @ApiModelProperty({ enum: enumToArray<$enumClassName>($enumClassName), isArray: true })"          >> $dto
            echo "    readonly "$enumVarName"List: $enumClassName[];"                                                   >> $dto
        else # simple foreign key
            echo ""                                                                                                     >> $dto
            echo "    @IsEnum($enumClassName)"                                                                          >> $dto
            echo "    @ApiModelProperty({ enum: enumToArray<$enumClassName>($enumClassName) })"                         >> $dto
            echo "    readonly $enumVarName: $enumClassName;"                                                           >> $dto
        fi
    done

    echo "}"                                                                                                            >> $dto
}

generate_dto "create"
generate_dto "update"

# add enumToArray methods in utils file
utilsFile=src/common/utils/utils.ts
if [ ${#enums[@]} -gt 0 ]; then
    mkdir -p src/common/utils
    if ! grep -q enumToArray $utilsFile; then # test if method exist
        echo ""                                                   >> $utilsFile
        echo "export function enumToArray<E>(e: any): string[] {" >> $utilsFile
        echo "    return Object.values(e);"                       >> $utilsFile
        echo "}"                                                  >> $utilsFile
    fi
fi  




# generate mongoose schema
echo "generate schema ..."

baseSchemaPropsFile=src/common/schemas/base-schema-properties.ts
if test ! -f "$commonSchemaPropsFile"; then
    mkdir -p src/common/schemas
    touch src/common/schemas/base-schema-properties.ts
    
    echo "export default { createdAt: { type: Date, default: Date.now }, updatedAt: Date };" > $baseSchemaPropsFile
fi

mkdir src/$collectionName/schemas
touch src/$collectionName/schemas/$collectionName.schema.ts

schema=src/$collectionName/schemas/$collectionName.schema.ts

echo "import * as mongoose from 'mongoose';"                                                        >> $schema
echo "import baseProperties from '../../common/schemas/base-schema-properties';"                    >> $schema
echo ""                                                                                             >> $schema
echo "const "$schemaName" = new mongoose.Schema({"                                                  >> $schema

# generate schema simple properties
for i in "${!propertyNames[@]}"; do
    propertyType=${propertyTypes[$i]}
    upperCasePropertyType=$(tr '[:lower:]' '[:upper:]' <<< ${propertyType:0:1})${propertyType:1}

    # is array ?
    if [ ${upperCasePropertyType: -2} = "[]" ]; then
        upperCasePropertyType=${upperCasePropertyType%?}
        upperCasePropertyType=${upperCasePropertyType%?}
        upperCasePropertyType="["$upperCasePropertyType"]" # [PropertyType]
    fi
    
    echo "    "${propertyNames[$i]}": "$upperCasePropertyType","                                    >> $schema
done  

# generate schema foreign key properties
for i in "${!foreignKeysClassName[@]}"; do
    foreignKeyClassName=${foreignKeysClassName[$i]}
    if [ ${foreignKeysType[$i]: -2} = "[]" ]; then
        echo "    ${foreignKeysVarName[$i]}: [{type: mongoose.Schema.Types.ObjectId, ref: '$foreignKeyClassName'}]," >> $schema
    else
        echo "    ${foreignKeysVarName[$i]}: {type: mongoose.Schema.Types.ObjectId, ref: '$foreignKeyClassName'}," >> $schema
    fi
done

# generate enum properties
for i in "${!enumsClassName[@]}"; do
    enumClassName=${enumsClassName[$i]}
    enumVarName=${enumsVarName[$i]}
    if [ ${enums[$i]: -2} = "[]" ]; then
        echo "    ${enumVarName}List: [String]," >> $schema
    else
        echo "    $enumVarName: String," >> $schema
    fi
done

echo "}, { versionKey: false });"                                                                   >> $schema
echo $schemaName".add(baseProperties);"                                                             >> $schema
echo ""                                                                                             >> $schema
echo "export { "$schemaName" };"                                                                    >> $schema

