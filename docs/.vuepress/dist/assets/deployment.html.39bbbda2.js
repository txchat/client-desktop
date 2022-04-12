import{_ as c,r as t,o,c as l,a as n,b as e,F as r,d as p,e as s}from"./app.43a68132.js";var i="/images/electron-signing.png";const u={},d=p(`<h1 id="\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72" aria-hidden="true">#</a> \u90E8\u7F72</h1><h2 id="\u65B0\u7248\u672C\u4E0A\u7EBF\u6B65\u9AA4" tabindex="-1"><a class="header-anchor" href="#\u65B0\u7248\u672C\u4E0A\u7EBF\u6B65\u9AA4" aria-hidden="true">#</a> \u65B0\u7248\u672C\u4E0A\u7EBF\u6B65\u9AA4</h2><p>\u4E0A\u7EBF\u65B0\u7248\u672C\u65F6, \u9700\u4E25\u683C\u6267\u884C, \u4EE5\u4FDD\u8BC1\u7528\u6237\u7684\u684C\u9762\u7AEF\u8001\u7248\u672C\u5BA2\u6237\u7AEF\u80FD\u591F\u83B7\u53D6\u66F4\u65B0\u901A\u77E5.</p><ol><li>\u65B0\u7248\u672C\u7684\u5185\u5BB9\u7ECF\u6D4B\u8BD5\u901A\u8FC7\u540E, \u5C06\u4EE3\u7801\u5408\u5E76\u81F3 <code>main</code> \u5206\u652F</li><li>\u5728 <code>main</code> \u5206\u652F\u4E2D, \u6253\u5F00 <code>package.json</code>, \u7136\u540E: <ol><li>\u8BBE\u7F6E\u65B0\u7684 <code>version</code> \u5B57\u6BB5, \u5982 <code>1.10.0</code></li><li><code>versionCode</code> \u5B57\u6BB5 + 1</li></ol></li><li>\u63D0\u4EA4 <code>main</code> \u5206\u652F, <code>commit message</code> \u4E3A: <code>release: bump version</code></li><li>\u4E3A\u8BE5 <code>commit</code> \u6DFB\u52A0 <code>tag</code>, \u503C\u4E0E\u4E0A\u65B9 <code>version</code> \u5B57\u6BB5\u6240\u586B\u7684\u76F8\u540C, \u5982 <code>1.10.0</code></li><li>push tag</li><li>\u8FD0\u884C\u4E0B\u9762\u7684\u6253\u5305\u547D\u4EE4, \u751F\u6210\u751F\u4EA7\u73AF\u5883\u5305</li></ol><h2 id="\u6253\u5305" tabindex="-1"><a class="header-anchor" href="#\u6253\u5305" aria-hidden="true">#</a> \u6253\u5305</h2><p>\u4F7F\u7528\u4EE5\u4E0B\u547D\u4EE4\u4E00\u952E\u6253\u5305 Web + \u684C\u9762\u5BA2\u6237\u7AEF:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> run build <span class="token operator">&amp;&amp;</span> <span class="token function">npm</span> run electron:build-release
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="\u591A\u4E2A\u9879\u76EE\u65B9" tabindex="-1"><a class="header-anchor" href="#\u591A\u4E2A\u9879\u76EE\u65B9" aria-hidden="true">#</a> \u591A\u4E2A\u9879\u76EE\u65B9</h3><p>\u5982\u679C\u9700\u8981\u6839\u636E\u4E0D\u540C\u9879\u76EE\u65B9\u6784\u5EFA\u4E0D\u540C\u7684\u7248\u672C, \u9700\u5148\u8BBE\u7F6E\u73AF\u5883 <code>THEME</code> \u53D8\u91CF, \u53C2\u8003 <code>package.json</code> \u4E2D\u7684 <code>serve:police</code> \u811A\u672C, \u4EE5\u53CA <code>src/assets/themes/</code> \u6587\u4EF6\u5939.</p><h3 id="electron-\u6784\u5EFA\u6CE8\u610F\u4E8B\u9879" tabindex="-1"><a class="header-anchor" href="#electron-\u6784\u5EFA\u6CE8\u610F\u4E8B\u9879" aria-hidden="true">#</a> Electron \u6784\u5EFA\u6CE8\u610F\u4E8B\u9879</h3><p>\u6784\u5EFA macOS \u7248\u672C\u7684 App \u9700\u8981 <code>Signing</code> \u6B65\u9AA4\u6CA1\u6709\u95EE\u9898, \u5982\u4E0B\u56FE\u6240\u793A:</p><p><img src="`+i+`" alt="1"></p><p>\u5982\u679C\u6784\u5EFA\u65F6\u8FD9\u4E00\u6B65\u9AA4\u524D\u9762\u7684\u70B9\u662F\u9EC4\u8272\uFF0CMac \u7248\u672C\u7684\u622A\u56FE\u4F1A\u4E0D\u6B63\u5E38\u3002</p><p><code>Signing</code> \u6B65\u9AA4\u9700\u672C\u5730\u5B58\u5728\u5F00\u53D1\u8005\u8D26\u6237,\u53EF\u5728 Mac \u7535\u8111\u4E0A\u5B89\u88C5 Xcode, \u7136\u540E\u767B\u5F55\u4E00\u4E2A\u5F00\u53D1\u8005\u8D26\u53F7\uFF0C\u6700\u540E\u56DE\u5230\u9879\u76EE\u8FDB\u884C\u6784\u5EFA\u5373\u53EF\u3002</p><h2 id="\u90E8\u7F72\u811A\u672C\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72\u811A\u672C\u53C2\u8003" aria-hidden="true">#</a> \u90E8\u7F72\u811A\u672C\u53C2\u8003</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">tar</span> -czf dist.tar dist
<span class="token function">scp</span> dist.tar root@your-domin.com:/home/tanxin/dist.tar
<span class="token function">rm</span> -rf dist.tar
<span class="token function">ssh</span> root@your-domin.com <span class="token string">&#39;cd /home/tanxin &amp;&amp; tar -xzf dist.tar &amp;&amp; rm -rf dist.tar &amp;&amp; rm web -rf &amp;&amp; mv dist web&#39;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;https://your-domin.com/web/ done&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="nginx-\u914D\u7F6E\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#nginx-\u914D\u7F6E\u53C2\u8003" aria-hidden="true">#</a> Nginx \u914D\u7F6E\u53C2\u8003</h2>`,17),b={class:"custom-container warning"},k=n("p",{class:"custom-container-title"},"WARNING",-1),m=s("\u7531\u4E8E\u9879\u76EE\u4E2D\u4F7F\u7528\u4E86\u6D4F\u89C8\u5668\u539F\u751F\u7684 "),h={href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto",target:"_blank",rel:"noopener noreferrer"},v=s("Crypto API"),_=s(" \u6765\u5BF9\u52A9\u8BB0\u8BCD\u3001\u804A\u5929\u6D88\u606F\u52A0\u89E3\u5BC6\uFF0C\u800C\u8FD9\u4E9B API \u53EA\u80FD\u5728 https \u73AF\u5883\u4E0B\u8D77\u4F5C\u7528\uFF0C\u6240\u4EE5"),y=n("strong",null,"\u90E8\u7F72\u7684\u7F51\u7AD9\u5FC5\u987B\u80FD\u591F\u901A\u8FC7 https \u8BBF\u95EE",-1),w=s("\uFF0C\u5426\u5219\u65E0\u6CD5\u6B63\u5E38\u4F7F\u7528\u3002\u53C2\u8003"),g={href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto/subtle",target:"_blank",rel:"noopener noreferrer"},x=s("\u8FD9\u91CC"),f=s("\u3002"),$=p(`<div class="language-nginx ext-nginx line-numbers-mode"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>   <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> your-domin.com</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">rewrite</span> ^(.*) https://your-domin.com<span class="token variable">$1</span> permanent</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">443</span> ssl</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">listen</span>       [::]:443 ssl http2</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span>  your-domin.com</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">root</span>      /home/tanxin</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">ssl_certificate</span> <span class="token string">&quot;\u4F60\u7684 SSL \u8BC1\u4E66\u8DEF\u5F84&quot;</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">ssl_certificate_key</span> <span class="token string">&quot;\u4F60\u7684 SSL \u8BC1\u4E66\u79D8\u94A5\u8DEF\u5F84&quot;</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">ssl_session_cache</span> shared:SSL:1m</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">ssl_session_timeout</span>  <span class="token number">10m</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">ssl_ciphers</span> HIGH:!aNULL:!MD5</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">ssl_prefer_server_ciphers</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>

    <span class="token comment"># \u8C08\u4FE1\u4E0B\u8F7D\u9875</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">index</span> /download/download.html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">## \u8C08\u4FE1\u7F51\u9875\u7248</span>
    <span class="token directive"><span class="token keyword">location</span> /web/</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">index</span> /web/index.html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">## \u4F01\u4E1A\u6A21\u5757 H5</span>
    <span class="token directive"><span class="token keyword">location</span> /oa/</span> <span class="token punctuation">{</span>
          <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /oa/index.html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">## \u4E8C\u7EF4\u7801\u8DF3\u8F6C\u9875</span>
    <span class="token directive"><span class="token keyword">location</span> /group-code/</span> <span class="token punctuation">{</span>
          <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /group-code/index.html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">## \u4E8C\u7EF4\u7801\u8DF3\u8F6C\u9875 v2</span>
    <span class="token directive"><span class="token keyword">location</span> /group-code-v2/</span> <span class="token punctuation">{</span>
          <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /group-code-v2/index.html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">## okr\u6A21\u5757 pc</span>
    <span class="token directive"><span class="token keyword">location</span> /okrpc</span> <span class="token punctuation">{</span>
          <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /okrpc/index.html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">## okr\u6A21\u5757 H5</span>
    <span class="token directive"><span class="token keyword">location</span> /okr/</span> <span class="token punctuation">{</span>
          <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /okr/index.html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">## \u4F01\u4E1A\u7BA1\u7406\u540E\u53F0</span>
    <span class="token directive"><span class="token keyword">location</span> /oa-admin/</span> <span class="token punctuation">{</span>
          <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /oa-admin/index.html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">## \u4F01\u4E1A\u6A21\u5757\u540E\u7AEF</span>
    <span class="token directive"><span class="token keyword">location</span> /proxyApi</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://172.16.101.107:20000/</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">## okr\u6A21\u5757\u540E\u7AEF</span>
    <span class="token directive"><span class="token keyword">location</span> /api</span> <span class="token punctuation">{</span>
      <span class="token directive"><span class="token keyword">proxy_pass</span> http://172.16.101.107:20001/</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token comment">#######################################</span>
    <span class="token comment">#### \u6CE8\u610F\uFF01\uFF01\uFF01</span>
    <span class="token comment">#### nginx http \u5904\u914D\u7F6E\u9700\u4FEE\u6539 HTTP \u8BF7\u6C42\u4E0A\u4F20\u6587\u4EF6\u5927\u5C0F\u9650\u5236 client_max_body_size 6M;</span>
    <span class="token comment">#######################################</span>
    <span class="token directive"><span class="token keyword">location</span> ~/(disc|backup|oss|app)/</span> <span class="token punctuation">{</span>
    	<span class="token directive"><span class="token keyword">proxy_pass</span> http://172.16.101.107:8888</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># \u8C08\u4FE1\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF</span>
    <span class="token directive"><span class="token keyword">location</span> /admin/</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /admin/index.html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># \u8C08\u4FE1\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF\u7684\u540E\u7AEF\u63A5\u53E3</span>
    <span class="token directive"><span class="token keyword">location</span> /backend/</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://172.16.101.107:8888</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment"># \u8C08\u4FE1\u7528\u6237\u534F\u8BAE</span>
    <span class="token directive"><span class="token keyword">location</span> /license/</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /license/index.html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br></div></div>`,1);function N(S,I){const a=t("ExternalLinkIcon");return o(),l(r,null,[d,n("div",b,[k,n("p",null,[m,n("a",h,[v,e(a)]),_,y,w,n("a",g,[x,e(a)]),f])]),$],64)}var A=c(u,[["render",N],["__file","deployment.html.vue"]]);export{A as default};
