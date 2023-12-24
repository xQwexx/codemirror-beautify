
export const javascriptTemplate = {
    ugly: `if('this_is'==/an_example/){of_beautifier();}else{var a=b?(c%d):e[f];}`,
    beautified: 
`if ('this_is' == /an_example/) {
  of_beautifier();
} else {
  var a = b ? (c % d) : e[f];
}`
}
export const htmlTemplate = {
    ugly: `<script> function (s,e){ for(var i=0; i < 1; i++) test("test();a=1");} </script>
    <script>
    function test(c){  for (var i = 0; i < 10; i++){	          process("a.b();c = null;", 300);}
    }
    </script>
    <table><tr><td>test 1</td></tr><tr><td>test 2</td></tr></table>
    <script> function test() { return 1;} </script>
    <style> .test { font-size: medium; font-family: monospace; }
    </style>`,
    beautified: 
`<script>
    function(s, e) {
        for (var i = 0; i < 1; i++) test(\"test();a=1\");
    }
</script>
<script>
    function test(c) {
        for (var i = 0; i < 10; i++) {
            process(\"a.b();c = null;\", 300);
        }
    }
</script>
<table>
    <tr>
        <td>test 1</td>
    </tr>
    <tr>
        <td>test 2</td>
    </tr>
</table>
<script>
    function test() {
        return 1;
    }
</script>
<style>
    .test {
        font-size: medium;
        font-family: monospace;
    }
</style>`
}

export const cssTemplate = {
    ugly: `div{border:1px solid black;margin-top:100px;margin-bottom:100px;margin-right:150px;margin-left:80px;background-color:lightblue;}`,
    beautified: 
`div {
    border: 1px solid black;
    margin-top: 100px;
    margin-bottom: 100px;
    margin-right: 150px;
    margin-left: 80px;
    background-color: lightblue;
}`
}