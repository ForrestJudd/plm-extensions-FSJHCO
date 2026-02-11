$(document).ready(function() {
    
    //insertMOW();
    //alert("Hey")
    const variables = {elementGroupId: "123",elementsfilter: "123"}
       const graphqlQuery = `
      query GetSchedule($elementGroupId: ID!, $elementsfilter: String!){
	elementsByElementGroup(elementGroupId: $elementGroupId,filter: { query: $elementsfilter}){
		pagination{
			pageSize
			cursor
		}
		results{
			id
			name
			properties{
				results{
					name
					value
					displayValue
					definition{
						units{
							name
						}
					}
				}
			}
			references{
				results{
					name
					value{
						properties{
							results{
								name
								value
								displayValue
								definition{
									units{
										name
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
    `;

    const requestBody = JSON.stringify({
        query: graphqlQuery,
        variables: variables,
    });

    const graphqlEndpoint = "https://your-graphql-api.com/graphql"; // Replace with your endpoint

    fetch(graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: 'Bearer '
        // Add any authorization headers if required, e.g., 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
      },
      body: requestBody,
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        console.log("GraphQL response:", data);
        // Process the data from the 'data' field or handle errors from the 'errors' field
      })
      .catch((error) => {
        console.error("Error fetching GraphQL data:", error);
      });

});