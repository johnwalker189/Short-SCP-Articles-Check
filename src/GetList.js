async function GetListByTagButCrom() {
    let ArticleArray = [];
    let TagString = document.getElementById("TagBox").value.trim();
    if (!TagString) {
        return;
    }
    let ExcludedTagString = document.getElementById("ExcludedTagBox").value.trim();
    document.getElementById("result").innerHTML = "<p>" + "Please wait..." + "</p>";
    let TagArray = TagString ? TagString.split(",").map(tag => tag.trim()) : [];
    let filterConditions = TagArray.length 
        ? TagArray.map(tag => `{wikidotInfo: {tags: {eq: \"${tag}\"}}}`).join(", ")
        : "";
    let ExcludedTagArray = ExcludedTagString ? ExcludedTagString.split(",").map(tag => tag.trim()) : [];
    let ExcludedFilterConditions = ExcludedTagArray.length 
        ? ExcludedTagArray.map(tag => `{_not: {wikidotInfo: {tags: {eq: \"${tag}\"}}}}`).join(", ")
        : "";
    /*console.log("Tags:", TagArray);
    console.log("Excluded Tags:", ExcludedTagArray);*/
    let hasNextPage = true;
    let afterCursor = null;

    while (hasNextPage) {
        let query = `
        query ThatQuestionWeJustAsked($after: ID) {
            pages(
                sort: { order: DESC, key: RATING }
                filter: {
                    _and: [
                    ${filterConditions},
                    ${ExcludedFilterConditions},
                    {url: {startsWith: "http://scp-wiki.wikidot.com/"}}
                    ]
                }
                first: 100
                after: $after
            ) {
                edges {
                    node {
                        url
                        translations {
                            url
                        }
                        wikidotInfo {
                            title
                            rating
                            textContent
                        }
                    }
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }`;

        //console.log("GraphQL Query:", query);

        let variables = {};
        if (afterCursor) {
            variables.after = afterCursor;
        }

        try {
            const response = await fetch('https://api.crom.avn.sh/graphql', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query, variables })
            });

            const data = await response.json();
            //console.log("API Response:", data);

            if (data.errors) {
                console.error("GraphQL Errors:", data.errors);
                break;
            }

            for (const edge of data.data.pages.edges) {
                let pageUrl = edge.node.url;
                let translations = edge.node.translations || [];
                let rating = parseInt(edge.node.wikidotInfo.rating) || 0; 
            
                let hasScpVn = translations.some(translation => translation.url.includes("scp-vn"));
                if (!hasScpVn) {
                    /*console.log("Source:", pageUrl);
                    console.log(edge.node.wikidotInfo.textContent);*/
                    let WordsCount = countWords(edge.node.wikidotInfo.textContent);
                    let title = edge.node.wikidotInfo.title;
                    ArticleArray.push({ link: pageUrl, rating: rating, WordsCount: WordsCount, title: title });
                }
            }

            hasNextPage = data.data.pages.pageInfo.hasNextPage;
            afterCursor = data.data.pages.pageInfo.endCursor;

        } catch (error) {
            console.error("Fetch Error:", error);
            break;
        }
    }

    // Sắp xếp theo rating giảm dần
    ArticleArray.sort((a, b) => {
        if (a.WordsCount !== b.WordsCount) {
            return a.WordsCount - b.WordsCount;
        }
        return b.rating - a.rating;
    });

    /*console.log("Final Sorted ArticleArray:", ArticleArray);*/

    let tableHtml = `
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="thead-dark">
          <tr>
            <th>Title</th>
            <th>Rating</th>
            <th>Word Count</th>
          </tr>
        </thead>
        <tbody>
  `;
  
    ArticleArray.forEach(article => {
        tableHtml += `
        <tr>
            <td><a href="${article.link}" target="_blank">${article.title}</a></td>
            <td>${article.rating}</td>
            <td>${article.WordsCount}</td>
        </tr>
        `;
    });
  
    tableHtml += `
            </tbody>
        </table>
        </div>
    `;
  
  document.getElementById("result").innerHTML = tableHtml;
}

function countWords(text) {
    let cleanedText = text.replace(/[.,!?;()"“”]/g, '');
    let words = cleanedText.trim().split(/\s+/);
    return words.length;
}
