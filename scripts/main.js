const App = () => {
    const [data, setData] = React.useState();

    React.useEffect(() => {
        Signagelive.getData('items', true).then(function (data) {
            if (data) {
                setData(JSON.parse(data));
            }
        });
        fetch('https://v2-internal-api.alpha.menuzen.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                query GetMenuBoard($username: String!, $path: String) {
                    menuBoard(username: $username, path: $path) {
                        name
                        elements
                        currencyDecimal
                        items {
                            id
                            name
                            subtitle
                            description
                            mainImage
                            variations {
                                label
                                price
                                kilojoules
                                defaultOption
                            }
                            outOfStock
                        }
                        accountData {
                            currency
                            fonts {
                                name
                                url
                            }
                        }
                    }
                }
            `,
                variables: {
                    username: 'kaipham43',
                    path: 'testchoi'
                },
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const formatData = {}
                result.data.menuBoard.items.forEach((item) => {
                    formatData[item.id] = item
                })

                Signagelive.setData('items', JSON.stringify(formatData), true);
                setData(formatData)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    React.useEffect(() => {
        const elements = document.querySelectorAll('[data-menuzen-item]');
        elements.forEach((element) => {
            const key = element.getAttribute('data-menuzen-key')
            const id = element.getAttribute('data-menuzen-item')
            if (!data || !data[id]) return;
            if (key == 'title') {
                element.innerHTML = data[id].name
            } else if (key == 'description') {
                element.innerHTML = data[id].description
            } else if (key == 'subtitle') {
                element.innerHTML = data[id].subtitle
            }
        })
    }, [data])

    return <div>
        <h1>{window.location.hostname}</h1>
        <div data-menuzen-item="6241" data-menuzen-key="title" />
        <div data-menuzen-item="6241" data-menuzen-key="description" />
        <div data-menuzen-item="6241" data-menuzen-key="subtitle" />
    </div>
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
