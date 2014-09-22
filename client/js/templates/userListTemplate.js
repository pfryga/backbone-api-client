<a href="#/new" class="btn btn-primary">New</a>
<hr />
<table class="table striped">
    <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
        </tr>
    </thead>
    <tbody>
        <% _.each(users, function(user) { %>
        <tr>
        <td><%= user.get('firstname') %></td>
        <td><%= user.get('lastname') %></td>
        <td><%= user.get('age') %></td>
        </tr>
        <% }); %>
    </tbody>
</table>
