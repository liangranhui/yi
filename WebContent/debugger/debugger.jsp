<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="yi.core.*" %>
<%@page import="yi.debugger.*" %>
<%
	Debugger debugger = DebuggerPage.newDebugger(request);
	Mod mod = debugger.getMod();
%>
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>调试器 - <%=debugger.getVersion()%> <%=debugger.getMilestone()%></title>
<link href="../lib/core/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
<link href="assets/css/app-debugger.css" rel="stylesheet" />
<!--[if lt IE 9]>
  <script src="lib/bootflat/js/html5shiv.js"></script>
  <script src="lib/bootflat/js/respond.min.js"></script>
<![endif]-->
</head>

<body>
<header class="navbar navbar-inverse">
  <div class="container">
    <div class="navbar-header">
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
      	<span class="sr-only">Toggle navigation</span>
      	<span class="icon-bar"></span>
      	<span class="icon-bar"></span>
      	<span class="icon-bar"></span>
      </button>
      <a href="#" class="navbar-brand">调试器</a>
    </div>
    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav navbar-right">
      </ul>
    </div>
  </div>
</header>

<div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <div class="panel-title"><%=mod.getName()%> - <%=mod.getVersion()%></div>
        </div>
        <div class="panel-body">
          <div id="mod">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 页脚 -->
<div class="container page-wrapper-footer">
  <div class="row">
    <div class="col-md-12">
      <div>
        <p class="text-muted credit">&copy; 2013,2014 东华软件</p>
      </div>
    </div>
  </div>
</div>

<script src="../lib/core/jquery/jquery-1.10.2.min.js" type="text/javascript"></script>
<script src="../lib/core/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../lib/core/seajs/sea.js" type="text/javascript"></script>
<script src="../lib/utils/store.js" type="text/javascript"></script>
<script src="../lib/utils/json2.js" type="text/javascript"></script>
<script src="../lib/core/yi/yi.js" type="text/javascript"></script>
<script type="text/javascript">
var modData = {
<%if (mod.existHtmlFile()) {%>
	html: '<%=mod.getContextPath() + mod.getHtmlFilename()%>'
<%}%>
};
</script>
<script src="assets/js/app-debugger.js" type="text/javascript"></script>
</body>
</html>