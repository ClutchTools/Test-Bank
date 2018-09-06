## Question

What is the order of react lifecycle method execution when a component will recieve new props from a provider/parent component that also triggers a re-render?

## Answer

1.) componentWillRecieveProps() <br>
2.) shouldComponentUpdate() <br>
3.) componentWillUpdate() <br>
4.) Render() <br>
5.) componentDidUpdate() <br>


https://cdn-images-1.medium.com/max/1600/1*5fwo0VC1KtiWH64CENQ8dQ.png
