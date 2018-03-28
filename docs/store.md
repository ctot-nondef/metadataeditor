# Store
This page is an overview for the different [VueX](https://vuex.vuejs.org/en/) store modules used in this application.

## Jowl
A Wrapper for [jowl.js](http://jowl.ontologyonline.org), which main functionality is to run queries through an specified ontology.

### Requirements
* [Jquery 1.2.6](https://code.jquery.com/jquery-1.2.6.js)

### Used by

* [Entitytable](/components#Entitytable)



### State

|Name | Type | What Is Stored | Mutated by |
|--|--|--|--|
| queries | <code>Object</code>| Contains different queries mapped by a given name (so it is possible to use the search in different places in the application without having them interfering each other, in terms of overwriting the other queries results.) | [setQuery](#setQuery) |
| queryhistory | <code>Object</code> | Also an object that stores already made queries in order to reduce redundancy | not at all --> TODO|
| ontology | <code>Object</code> | jOWL.js-object that contains the functions for searching the ontology as well as the ontology itself.  | [setOntology](#setOntology) |
| ontologyPath | <code>String</code> |  Path to the ontology used. | [setOntologyPath](#setOntologyPath) |
| processing | <code>Boolean</code> | showing if something is being processed right now. | [startProcessing](#startProcessing)<br>[stopProcessing](#stopProcessing) |
| processingMessage | <code>String</code>  | A message containing information about what is being processed right now. Can be shown to user. | [startProcessing](#startProcessing)<br>[stopProcessing](#stopProcessing)|

### Actions

#### setOntology

Sets up the functionality of jowl.js with a given OWL-ontology.
it calls [jOWL.load](http://jowl.ontologyonline.org/documentation.html?owlClass=load) which initializes jOWL.
Once the loading was successful, the path to the document, as well as the jOWL-object is commited to the store. While this process takes place, a processing message appears in the store as well as the boolean loading being set to true. So this message is displayable, if loading is true.

##### Committed by
* [App](/components#App)


##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | Path where the ontology is located |

##### Commits
* [startProcessing](#startProcessing)
* [setOntologyPath](#setOntologyPath)
* [setOntology](#setOntology)
* [stopProcessing](#stopProcessing)

#### makeQuery
This method uses a given search query to find matching items in the JOWL-ontology.
These findings are committed to the store using a given name (using [setQuery](#setQuery)).

While results are fetched startProcessing is committed with the query-String.
It returns a <code>Promise</code>.

If something goes wrong, the Promise is rejected with an error message of the procedure, if not it is resolved with the received results.

##### Parameters

| Param | Type | Description |
| --- | --- | --- |
| q | <code>String</code> | Name of the query (used in the store) |
| query | <code>String</code> | Search-String used to create query in using [jOWL.SPARQL_DL](http://jowl.ontologyonline.org/documentation.html?owlClass=SPARQL-DL)  |


#### fetchClasses
Small method to receive all classes and store the query to a given name.

It just calls [makeQuery](#makeQuery) with q and the <code>query='Class(?x)'</code>
##### Parameters

| Param | Type | Description |
| --- | --- | --- |
| q | <code>String</code> | Name of the query (used in the store) |



#### fetchSubClassOf

Small method to receive all subclasses of a given class and store the query to a given name.

It just calls [makeQuery](#makeQuery) with q and the <code>query='SubClassOf(?sc, YOUR_CLASS_HERE)'</code>
##### Parameters

| Param | Type | Description |
| --- | --- | --- |
| q | <code>String</code> | Name of the query (used in the store) |
| c | <code>String</code> | Name of the  Class of which you want to receive subclasses |




#### fetchPropertiesByURI

Small method to receive properties of a given uri and store the query to a given name.

It just calls [makeQuery](#makeQuery) with q and the <code>query='PropertyValue(YOUR_URI_HERE, ?p, ?x)'</code>
##### Parameters

| Param | Type | Description |
| --- | --- | --- |
| q | <code>String</code> | Name of the query (used in the store) |
| uri | <code>String</code> | URI of which you want to receive properties |



### Mutations

#### setQuery
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | name that is used as a key to store the <code>result</code> |
| result | <code>Anything</code> | usually the result of the query that is stored to the <code>name</code> of the query |

#### setOntologyPath
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | path that is saved to the ontologyPath in the store  |
#### setOntology
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| ontology | <code>Object</code> | ontology-Object which gets stored to store.ontology |
#### startProcessing
Changes the <code>processing</code> variable in the store to <code>true</code>, stores the message to store.processingMessage. if empty: 'Processing...' is used as the default.
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | Message which is saved to the store as processingMessage |
#### stopProcessing
Changes the <code>processing</code> back to <code>false</code> and deletes any processing Message.



## N3
Store module for wrapping [n3.js](https://github.com/RubenVerborgh/N3.js/) and using its functionalities to
* load existing ttl-files into the store
* load new triples into the store  

### Requirements

* [n3-browser.js](https://github.com/RubenVerborgh/N3.js/)

### State



|Name | Type | What Is Stored | Mutated by |
|--|--|--|--|
| module | <code>N3-Object</code>| contains the whole functionality of N3 in one object | initialized at the beginning from n3.js. after that it doesn't require changes. |
|store | <code>N3-Object</code> | calls [N3.Store()](https://github.com/RubenVerborgh/N3.js/#storing), which enables using functions such as addTriple and getTriples  ([Reference](https://github.com/RubenVerborgh/N3.js/#addition-and-deletion-of-triplesquads)) | initialized at the beginning from n3.js. after that it doesn't require changes. |
| parser | <code>N3-Object</code> | is initialized from [N3.Parser()](https://github.com/RubenVerborgh/N3.js/#parsing), used for parsing strings to the Store | initialized at the beginning from n3.js. after that it doesn't require changes. |
| tripleCount | <code>Int</code> |  number of triples in the store | [updateTripleCount](#updateTripleCount) |
| subjects | <code>Object</code> | maps names of each subject to its type.  | [updateSubject](#updateSubject) |
| processing | <code>Boolean</code> | showing if something is being processed right now. | [startProcessing](#startProcessing-1)<br>[stopProcessing](#stopProcessing-1) |
| processingMessage | <code>String</code>  | A message containing information about what is being processed right now. Can be shown to user. | [startProcessing](#startProcessing-1)<br>[stopProcessing](#stopProcessing-1)|
| counter | <code>Int</code>  | An internal counter to ensure that new inserts can be grouped to one and the same name, gets increased after each manual add of triples via [FormFromSchema](/components#FormFromSchema) | [increaseCounter](#increaseCounter)|


### Actions
#### AddTriple
Adds a triple object to the store using N3s addTriple function via [state.store.addTriple](https://github.com/RubenVerborgh/N3.js/#writing) (which is just the n3.js function of adding triples)
after that [updateTripleCount](#updateTripleCount) and [updateSubject](#updateSubject) are committed.

##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| triple | <code>Object</code> | The triple object that will be added to the store. it looks like this:<br>```{subject:'s', predicate: 'p', object: 'o'}```  (All attributes are strings) |
##### Commits
* [updateTripleCount](#updateTripleCount)
* [updateSubject](#updateSubject)

#### AddFilteredTriple
Calls the [RemovePrefix](#RemovePrefix) function on the subject and object of the triple to remove the prefixes n3.js automatically adds when parsing blank namespaces before adding it to the store using [AddTriple](#addTriple), never called directly, currently only used in [StringToStore](#StringToStore).
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| triple | <code>Object</code> | The triple object that will be added to the store. it looks like this:<br>```{subject:'s', predicate: 'p', object: 'o'}```  (All attributes are strings) |

#### StringToStore
High level action parsing a .ttl file into triples and subsequently saving them to the store.
for that it uses n3s parse function via [state.parser.parse](https://github.com/RubenVerborgh/N3.js/#parsing).

after there are no triples, [updateTripleCount](#updateTripleCount-1) and [updateSubject](#updateSubject) are trigered as well as [stopProcessing](#stopProcessing-1) (before fetching triples [startProcessing](#startProcessing-1) is called).
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | The string which is being parsed |
##### Commits
* [startProcessing](#startProcessing-1)
* [updateTripleCount](#updateTripleCount)
* [updateSubject](#updateSubject)
* [stopProcessing](#stopProcessing-1)

##### Dispatches
* [AddFilteredTriple](#AddFilteredTriple)

#### objectToStore
High level action parsing a JS-object into triples and subsequently saving them to the store.
used to insert data from [FormFromSchema](/components#FormFromSchema) to manually insert them to the store.

After committing [startProcessing](#startProcessing-1) a first triple for the type is manually added using AddTriple. this is necessary, because the [ARCHE-API](https://fedora.hephaistos.arz.oeaw.ac.at/browser/api/getMetadata/person/?_format=json) returns the type of a schema at an extra attribute ID.

the first triple's predicate is: http://www.w3.org/1999/02/22-rdf-syntax-ns#type


Then in a loop each predicate-object pair is added with the unique id of '\_\:b\$\{state.counter\}_manual' as subject.
NOTE: Only pairs, which values is equal to true (=not empty or null) are added, other are ignored.

after everything is done, the 4 updates are committed:
##### Commits
* [increaseCounter](#increaseCounter-1)
* [updateTripleCount](#updateTripleCount)
* [updateSubject](#updateSubject)
* [stopProcessing](#stopProcessing-1)


##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| schema | <code>Object</code> | Schema object containing the type of the subject (the returned data from a request to [/metadata](https://fedora.hephaistos.arz.oeaw.ac.at/browser/api/getMetadata/person/?_format=json) using [getMetadataByType](/helpers#getMetadataByType)) |
| obj | <code>Object</code> | Object containing the key (=predicates) and value(=objects) pairs to be added to a new subject. A sample object can be found below. |


###### Example obj parameter

``` Example
{"hasAddress":"Sonnenfelsgasse 19","hasAddressLine1":"","hasAddressLine2":"",
"hasAlternativeTitle":"","hasCity":"","hasCountry":"",
"hasDescription":"Lorem ipsum dolor sit amet, consectetur adipisicing elit...",
"hasEmail":"","hasFirstName":"","hasIdentifier":"","hasLastName":"","hasLifeCycleStatus":"",
"hasPersonalTitle":"","hasPostcode":"","hasRegion":"","hasTitle":"",
"hasVersion":"","isActor":"","isAuthor":"","isContact":"","isContributor":"",
"isCreator":"","isCurator":"","isDepositor":"","isEditor":"","isFunder":"",
"isHosting":"","isLicensor":"","isMember":"","isMetadataCreator":"","isOwner":"",
"isPrincipalInvestigator":"","isRightsHolder":""}
```
Since everything except address and description are empty only 3 triples would be added.
All with the same unique subject name. the first triple would be about the type.

##### Dispatches
* [AddTriple](#AddTriple)

### Mutations
#### updateTripleCount
Updates the triple counter with the current triple count using n3s [store.countTriples function](https://github.com/RubenVerborgh/N3.js/#searching-triplesquads-or-entities).
#### increaseCounter
Increases the counter used to give subjects unique IDs by one.
#### updateSubject
Fetches all subjects and corresponding objects for which the predicate is http://www.w3.org/1999/02/22-rdf-syntax-ns#type and stores them in .subjects. Is committed every time a modification is made to the N3 store. Uses N3s functions: forSubjects and store.getObjects.
#### startProcessing
Changes the <code>processing</code> variable in the store to <code>true</code>, displays a processing message if given.
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | Message which is displayed in the store as processing message |
#### stopProcessing
Changes the <code>processing</code> back to <code>false</code> and deletes any processing Message.
### Others
#### RemovePrefix
Checks and removes prefixes from triples which are automatically added by n3.js when parsing blank namespaces.
##### Parameters
| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | String with potential prefix |

## JSONschema


Small store module for storing different meta data schemas by their type.

### Requirements

none

### State


|Name | Type | What Is Stored | Mutated by |
|--|--|--|--|
| schemas | <code>Object</code>| Object for storing schemas received via [getMetadataByType](/helpers#getMetadataByType) | [setSchema](#setSchema) |
|entries | <code>Object</code> | the idea of this object is to store different models (data) for different schemas as well as for the same schema (To keep persistence, this object could easily be thrown in the local storage). However currently this setup is flawed and not used in any component. | [setEntry](setEntry) |


### Actions

none

### Mutations


#### setSchema
stores a given schema in store mapping it to the given name (only if both exist)

##### Parameters
Since a mutation can only have one payload an object containing the following params as keys is required:

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the name you want your schema to be mapped to. can be anything, but schould be unique to other names if you have different types, but multiple calls of this function, since the content would be overwritten.  |
| schema | <code>Object</code> | meta data schema received from [getMetadataByType](/helpers#getMetadataByType) |

#### setEntry

stores a given entry (an object looking like [this](#example-obj-parameter)) in store mapping it to the given name (only if both exist)

##### Parameters
Since a mutation can only have one payload an object containing the following params as keys is required:

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the name you want your schema to be mapped to. can be anything, but schould be unique to other names if you have different types, but multiple calls of this function, since the content would be overwritten.  |
| entry | <code>Object</code> | model of the FormSchema, see [FormFromSchema](/components#FormFromSchema) |